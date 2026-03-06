"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenUseCase = void 0;
const UnauthorizedError_1 = require("../../domain/erros/UnauthorizedError");
const UserNotFoundError_1 = require("../../domain/erros/UserNotFoundError");
const UserMapper_1 = require("../mappers/UserMapper");
class RefreshTokenUseCase {
    userQueryRepository;
    refreshTokenRepository;
    refreshTokenQueryRepository;
    tokenService;
    constructor(userQueryRepository, refreshTokenRepository, refreshTokenQueryRepository, tokenService) {
        this.userQueryRepository = userQueryRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.refreshTokenQueryRepository = refreshTokenQueryRepository;
        this.tokenService = tokenService;
    }
    async execute(refreshToken) {
        const hash = this.tokenService.hashToken(refreshToken);
        const storedToken = await this.refreshTokenQueryRepository.findByHash(hash);
        if (!storedToken ||
            storedToken.revokedAt ||
            storedToken.expiresAt < new Date()) {
            throw new UnauthorizedError_1.UnauthorizedError();
        }
        const userPersistido = await this.userQueryRepository.findById(storedToken.userId);
        if (!userPersistido) {
            throw new UserNotFoundError_1.UserNotFoundError();
        }
        if (userPersistido.passwordChangeAt &&
            storedToken.createdAt < userPersistido.passwordChangeAt) {
            throw new UnauthorizedError_1.UnauthorizedError();
        }
        const user = UserMapper_1.UserMapper.toDomain(userPersistido);
        await this.refreshTokenRepository.revoke(storedToken.id);
        const accessToken = this.tokenService.generateAccessToken(user.getId(), user.getName(), user.getEmail(), user.getPasswordChangeAt());
        const { token, hash: newHash, expiresAt } = this.tokenService.generateRefreshToken();
        await this.refreshTokenRepository.create({
            userId: user.getId(),
            tokenHash: newHash,
            expiresAt
        });
        return {
            accessToken,
            refreshToken: token
        };
    }
}
exports.RefreshTokenUseCase = RefreshTokenUseCase;
//# sourceMappingURL=RefreshTokenUseCase.js.map