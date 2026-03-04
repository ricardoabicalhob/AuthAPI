import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository";
import { UnauthorizedError } from "../../domain/erros/UnauthorizedError";
import type { UserPasswordHashService } from "../../domain/services/UserPasswordHashService";
import type { TokenHashService } from "../../domain/services/TokenHashService";
import { User } from "../../domain/entities/User.entity";
import { UserMapper } from "../mappers/UserMapper";

export class ResetPasswordUseCase {
    constructor(
        private readonly userRepository :IUserRepository,
        private readonly userQueryRepository :IUserQueryRepository,
        private readonly hashService :UserPasswordHashService,
        private readonly tokenHashService :TokenHashService
    ) {}

    async execute(token :string, newPassword :string) :Promise<void> {
        const tokenHash = this.tokenHashService.hash(token)

        const userPersistido = await this.userQueryRepository.findByPasswordResetToken(tokenHash)
        
        if(!userPersistido) {
            throw new UnauthorizedError()
        }

        const user = UserMapper.toDomain(userPersistido)

        const passwordHash = await this.hashService.hash(newPassword)

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