import bcrypt from "bcrypt"
import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository";
import type { UserPasswordHashService } from "../../domain/services/UserPasswordHashService";
import { UserNotFoundError } from "../../domain/erros/UserNotFoundError";
import { UnauthorizedError } from "../../domain/erros/UnauthorizedError";

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

        const user = await this.userQueryRepository.findUserWithPasswordById(userId)

        if(!user) {
            throw new UserNotFoundError()
        }

        const passwordMatch = await bcrypt.compare(
            currentPassword,
            user.password
        )

        if(!passwordMatch) {
            throw new UnauthorizedError()
        }

        const newPasswordHash = await this.hashService.hash(newPassword)

        await this.userRepository.updatePassword(
            userId,
            newPasswordHash
        )
    }
}