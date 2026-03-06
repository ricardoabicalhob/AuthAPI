"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenController = void 0;
class RefreshTokenController {
    refreshTokenUseCase;
    constructor(refreshTokenUseCase) {
        this.refreshTokenUseCase = refreshTokenUseCase;
    }
    async handle(request, reply) {
        const { refreshToken } = request.body;
        const result = await this.refreshTokenUseCase.execute(refreshToken);
        return reply.status(200).send(result);
    }
}
exports.RefreshTokenController = RefreshTokenController;
//# sourceMappingURL=RefreshTokenController.js.map