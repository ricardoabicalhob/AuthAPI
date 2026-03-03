import bcrypt from "bcrypt"
import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository";
import { UserNotFoundError } from "../../domain/erros/UserNotFoundError";
import { UnauthorizedError } from "../../domain/erros/UnauthorizedError";
import type { UserPasswordHashService } from "../../domain/services/UserPasswordHashService";
import { User } from "../../domain/entities/User.entity";

export class ChangePasswordUseCase {
    constructor(
        private readonly userRepository :IUserRepository,
        private readonly userQueryRepository :IUserQueryRepository,
        private readonly hashService :UserPasswordHashService
    ) {}

    async execute(
        userId :string,
        currentPassword :string,
        newPassword :string
    ) :Promise<void> {

        const userPersistido = await this.userQueryRepository.findUserWithPasswordById(userId)

        if(!userPersistido) {
            throw new UserNotFoundError()
        }

        const user = User.restore(
            {
                email: userPersistido.email,
                password: userPersistido.password,
                passwordChangeAt: userPersistido.passwordChangeAt,
                passwordResetToken: userPersistido.passwordResetToken,
                passwordResetExpiresAt: userPersistido.passwordResetExpiresAt,
                deletedAt: userPersistido.deletedAt
            },
            userPersistido.id
        )

        const passwordMatch = await bcrypt.compare(
            currentPassword,
            user.getPassword()
        )

        if(!passwordMatch) {
            throw new UnauthorizedError()
        }

        const newPasswordHash = await this.hashService.hash(newPassword)

        user.changePassword(newPasswordHash)

        await this.userRepository.updatePassword(
            user.getId(), 
            user.getPassword(),
            user.getPasswordChangeAtOrThrow()
        )
    }
}