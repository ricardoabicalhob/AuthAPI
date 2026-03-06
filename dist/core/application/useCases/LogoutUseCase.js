"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutUseCase = void 0;
class LogoutUseCase {
    refreshTokenQueryRepository;
    refreshTokenRepository;
    tokenHashService;
    constructor(refreshTokenQueryRepository, refreshTokenRepository, tokenHashService) {
        this.refreshTokenQueryRepository = refreshTokenQueryRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.tokenHashService = tokenHashService;
    }
    async execute(refreshToken) {
        const tokenHash = this.tokenHashService.hash(refreshToken);
        const storedToken = await this.refreshTokenQueryRepository.findByHash(tokenHash);
        if (!storedToken) {
            return;
        }
        await this.refreshTokenRepository.revoke(storedToken.id);
    }
}
exports.LogoutUseCase = LogoutUseCase;
//# sourceMappingURL=LogoutUseCase.js.map