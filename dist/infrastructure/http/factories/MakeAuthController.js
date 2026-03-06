"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthController = makeAuthController;
const AuthController_1 = require("../controllers/AuthController");
const LoginUseCase_1 = require("../../../core/application/useCases/LoginUseCase");
const UserPrismaRepository_1 = require("../../database/UserPrismaRepository");
const TokenService_1 = require("../../../core/domain/services/TokenService");
const RefreshTokenPrismaRepository_1 = require("../../database/RefreshTokenPrismaRepository");
const LogoutUseCase_1 = require("../../../core/application/useCases/LogoutUseCase");
const TokenHashService_1 = require("../../../core/domain/services/TokenHashService");
function makeAuthController() {
    const userQueryRepository = new UserPrismaRepository_1.UserPrismaQueryRepository();
    const refreshTokenRepository = new RefreshTokenPrismaRepository_1.RefreshTokenPrismaRepository();
    const refreshTokenQueryRepository = new RefreshTokenPrismaRepository_1.RefreshTokenPrismaQueryRepository();
    const tokenService = new TokenService_1.TokenService();
    const tokenHashService = new TokenHashService_1.TokenHashService();
    const loginUseCase = new LoginUseCase_1.LoginUseCase(userQueryRepository, refreshTokenRepository, tokenService);
    const logoutUseCase = new LogoutUseCase_1.LogoutUseCase(refreshTokenQueryRepository, refreshTokenRepository, tokenHashService);
    return new AuthController_1.AuthController({
        loginUseCase,
        logoutUseCase
    });
}
//# sourceMappingURL=MakeAuthController.js.map