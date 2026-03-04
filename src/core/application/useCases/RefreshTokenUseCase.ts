import type { IUserQueryRepository } from "../../../interfaces/repositories/UserRepository";
import { UnauthorizedError } from "../../domain/erros/UnauthorizedError";
import { UserNotFoundError } from "../../domain/erros/UserNotFoundError";
import type { TokenService } from "../../domain/services/TokenService";
import type { IRefreshTokenQueryRepository, IRefreshTokenRepository } from "../../../interfaces/repositories/RefreshTokenRepository";
import { UserMapper } from "../mappers/UserMapper";

export class RefreshTokenUseCase {
    constructor(
        private readonly userQueryRepository :IUserQueryRepository,
        private readonly refreshTokenRepository :IRefreshTokenRepository,
        private readonly refreshTokenQueryRepository :IRefreshTokenQueryRepository,
        private readonly tokenService :TokenService
    ) {}

    async execute(refreshToken :string) {
        const hash = this.tokenService.hashToken(refreshToken)

        const storedToken = await this.refreshTokenQueryRepository.findByHash(hash)

        if(
            !storedToken ||
            storedToken.revokedAt ||
            storedToken.expiresAt < new Date()
        ) {
            throw new UnauthorizedError()
        }

        const userPersistido = await this.userQueryRepository.findById(storedToken.userId)

        if(!userPersistido) {
            throw new UserNotFoundError()
        }

        if(
            userPersistido.passwordChangeAt &&
            storedToken.createdAt < userPersistido.passwordChangeAt
        ) {
            throw new UnauthorizedError()
        }

        const user = UserMapper.toDomain(userPersistido)

        await this.refreshTokenRepository.revoke(storedToken.id)

        const accessToken = this.tokenService.generateAccessToken(
            user.getId(),
            user.getPasswordChangeAt()
        )

        const { token, hash: newHash, expiresAt } = this.tokenService.generateRefreshToken()

        await this.refreshTokenRepository.create({
            userId: user.getId(),
            tokenHash: newHash,
            expiresAt
        })

        return {
            accessToken,
            refreshToken: token
        }
    }
}