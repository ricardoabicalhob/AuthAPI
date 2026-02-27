import type { IRefreshTokenQueryRepository, IRefreshTokenRepository } from "../../../interfaces/repositories/RefreshTokenRepository";
import type { TokenHashService } from "../../domain/services/TokenHashService";

export class LogoutUseCase {
    constructor(
        private readonly refreshTokenQueryRepository :IRefreshTokenQueryRepository,
        private readonly refreshTokenRepository :IRefreshTokenRepository,
        private readonly tokenHashService :TokenHashService
    ) {}

    async execute(refreshToken :string) :Promise<void> {
        const tokenHash = this.tokenHashService.hash(refreshToken)

        const storedToken = await this.refreshTokenQueryRepository.findByHash(tokenHash)

        if(!storedToken) {
            return 
        }

        await this.refreshTokenRepository.revoke(storedToken.id)
    }
}