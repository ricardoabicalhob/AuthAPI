import type { IUserQueryRepository, IUserRepository } from "../../interfaces/repositories/UserRepository";
import type { MailService } from "../services/MailService";
import type { TokenService } from "../services/TokenService";

export class RequestPasswordResetUseCase {
    constructor(
        private readonly userRepository :IUserRepository,
        private readonly userQueryRepository :IUserQueryRepository,
        private readonly tokenService :TokenService,
        private readonly mailService :MailService
    ) {}

    async execute(email :string) :Promise<void> {
        const user = await this.userQueryRepository.findByEmail(email)

        if(!user) return

        const { token, hash } = this.tokenService.generateResetToken()

        const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

        await this.userRepository.savePasswordResetToken(
            user.id,
            hash,
            expiresAt
        )

        const resetLink = `https://app.exemplo.com/reset-password?token=${token}`

        await this.mailService.sendPasswordReset(
            user.email,
            resetLink
        )
    }
}