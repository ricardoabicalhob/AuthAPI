import crypto from "crypto"
import type { IUserQueryRepository } from "../../../interfaces/repositories/UserRepository";
import { UnauthorizedError } from "../../domain/erros/UnauthorizedError";
import { UserNotFoundError } from "../../domain/erros/UserNotFoundError";
import type { TokenService } from "../../domain/services/TokenService";
import type { IRefreshTokenQueryRepository, IRefreshTokenRepository } from "../../../interfaces/repositories/RefreshTokenRepository";

export class RefreshTokenUseCase {
    constructor(
        private readonly userQueryRepository :IUserQueryRepository,
        private readonly refreshTokenRepository :IRefreshTokenRepository,
        private readonly refreshTokenQueryRepository :IRefreshTokenQueryRepository,
        private readonly tokenService :TokenService
    ) {}

    async execute(refreshToken :string) {
        const hash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex")

        const storedToken = await this.refreshTokenQueryRepository.findByHash(hash)

        if(!storedToken) {
            throw new UnauthorizedError()
        }

        if(storedToken.revokeAt) {
            throw new UnauthorizedError()
        }

        if(storedToken.expiresAt < new Date()) {
            throw new UnauthorizedError()
        }

        const user = await this.userQueryRepository.findById(storedToken.userId)

        if(!user) {
            throw new UserNotFoundError()
        }

        await this.refreshTokenRepository.revoke(storedToken.id)

        const accessToken = this.tokenService.generateAccessToken(
            user.id,
            user.passwordChangeAt
        )

        const { token, hash: newHash } = this.tokenService.generateRefreshToken()

        await this.refreshTokenRepository.create({
            userId: user.id,
            tokenHash: newHash,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

        return {
            accessToken,
            refreshToken: token
        }
    }
}