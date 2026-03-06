import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository";
import type { MailService } from "../../domain/services/MailService";
import type { TokenService } from "../../domain/services/TokenService";

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

        const resetLink = process.env.FRONTEND_URL + `?token=${token}` || `http://localhost:5173?token=${token}`

        await this.mailService.sendPasswordReset(
            user.email,
            resetLink
        )
    }
}