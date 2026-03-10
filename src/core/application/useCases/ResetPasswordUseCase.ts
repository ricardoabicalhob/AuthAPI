import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository";
import { UnauthorizedError } from "../../domain/erros/UnauthorizedError";
import type { PasswordHasher } from "../../domain/services/PasswordHasher";
import type { TokenHashService } from "../../domain/services/TokenHashService";
import { Password } from "../../domain/value-objects/Password";
import { PasswordHash } from "../../domain/value-objects/PasswordHash";
import { UserMapper } from "../mappers/UserMapper";

export class ResetPasswordUseCase {
    constructor(
        private readonly userRepository :IUserRepository,
        private readonly userQueryRepository :IUserQueryRepository,
        private readonly hashService :PasswordHasher,
        private readonly tokenHashService :TokenHashService
    ) {}

    async execute(token :string, newPassword :string) :Promise<void> {
        const tokenHash = this.tokenHashService.hash(token)

        const userPersistido = await this.userQueryRepository.findByPasswordResetToken(tokenHash)
        
        if(!userPersistido) {
            throw new UnauthorizedError()
        }

        const user = UserMapper.toDomain(userPersistido)

        const newPasswordPlain = Password.create(newPassword)

        const hash = await this.hashService.hash(newPasswordPlain.getValue())

        const passwordHash = PasswordHash.create(hash)

        user.changePassword(passwordHash)
        user.clearPasswordResetToken()

        await this.userRepository.updatePassword(
            user.getId(), 
            user.getPassword(),
            user.getPasswordChangeAtOrThrow()
        )

        await this.userRepository.clearPasswordResetToken(
            user.getId(),
            user.getPasswordResetTokenOrThrow(),
            user.getPasswordResetExpiresAtOrThrow()
        )  
    }
}