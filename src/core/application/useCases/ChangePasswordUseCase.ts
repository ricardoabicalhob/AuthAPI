import bcrypt from "bcrypt"
import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository";
import { UserNotFoundError } from "../../domain/erros/UserNotFoundError";
import { UnauthorizedError } from "../../domain/erros/UnauthorizedError";
import { PasswordHasher } from "../../domain/services/PasswordHasher";
import { UserMapper } from "../mappers/UserMapper";
import { PasswordHash } from "../../domain/value-objects/PasswordHash";
import { Password } from "../../domain/value-objects/Password";

export class ChangePasswordUseCase {
    constructor(
        private readonly userRepository :IUserRepository,
        private readonly userQueryRepository :IUserQueryRepository,
        private readonly hashService :PasswordHasher
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

        const user = UserMapper.toDomain(userPersistido)

        const passwordMatch = await bcrypt.compare(
            currentPassword,
            user.getPassword()
        )

        if(!passwordMatch) {
            throw new UnauthorizedError()
        }

        const newPasswordPlain = Password.create(newPassword)

        const newHash = await this.hashService.hash(newPasswordPlain.getValue())

        const newPasswordHash = PasswordHash.create(newHash)

        user.changePassword(newPasswordHash)

        await this.userRepository.updatePassword(
            user.getId(), 
            user.getPassword(),
            user.getPasswordChangeAtOrThrow()
        )
    }
}