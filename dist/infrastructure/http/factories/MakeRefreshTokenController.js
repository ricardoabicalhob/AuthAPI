"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRefreshTokenController = makeRefreshTokenController;
const RefreshTokenController_1 = require("../controllers/RefreshTokenController");
const RefreshTokenUseCase_1 = require("../../../core/application/useCases/RefreshTokenUseCase");
const UserPrismaRepository_1 = require("../../database/UserPrismaRepository");
const TokenService_1 = require("../../../core/domain/services/TokenService");
const RefreshTokenPrismaRepository_1 = require("../../database/RefreshTokenPrismaRepository");
function makeRefreshTokenController() {
    const userQueryRepository = new UserPrismaRepository_1.UserPrismaQueryRepository();
    const refreshTokenRepository = new RefreshTokenPrismaRepository_1.RefreshTokenPrismaRepository();
    const refreshTokenQueryRepository = new RefreshTokenPrismaRepository_1.RefreshTokenPrismaQueryRepository();
    const tokenService = new TokenService_1.TokenService();
    const refreshTokenUseCase = new RefreshTokenUseCase_1.RefreshTokenUseCase(userQueryRepository, refreshTokenRepository, refreshTokenQueryRepository, tokenService);
    return new RefreshTokenController_1.RefreshTokenController(refreshTokenUseCase);
}
//# sourceMappingURL=MakeRefreshTokenController.js.map