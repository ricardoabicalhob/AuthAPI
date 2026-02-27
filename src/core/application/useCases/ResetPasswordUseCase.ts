import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository";
import { UnauthorizedError } from "../../domain/erros/UnauthorizedError";
import type { UserPasswordHashService } from "../../domain/services/UserPasswordHashService";
import type { TokenHashService } from "../../domain/services/TokenHashService";

export class ResetPasswordUseCase {
    constructor(
        private readonly userRepository :IUserRepository,
        private readonly userQueryRepository :IUserQueryRepository,
        private readonly hashService :UserPasswordHashService,
        private readonly tokenHashService :TokenHashService
    ) {}

    async execute(token :string, newPassword :string) :Promise<void> {
        const tokenHash = this.tokenHashService.hash(token)

        const user = await this.userQueryRepository.findByPasswordResetToken(tokenHash)
        
        if(!user) {
            throw new UnauthorizedError()
        }

        const passwordHash = await this.hashService.hash(newPassword)

        await this.userRepository.updatePassword(user.id, passwordHash)
        await this.userRepository.clearPasswordResetToken(user.id)  
    }
}