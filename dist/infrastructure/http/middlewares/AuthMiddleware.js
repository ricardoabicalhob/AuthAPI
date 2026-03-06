"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const TokenService_1 = require("../../../core/domain/services/TokenService");
const UserPrismaRepository_1 = require("../../database/UserPrismaRepository");
const UnauthorizedError_1 = require("../../../core/domain/erros/UnauthorizedError");
async function authMiddleware(request, reply) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new UnauthorizedError_1.UnauthorizedError();
    }
    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
        throw new UnauthorizedError_1.UnauthorizedError();
    }
    try {
        const tokenService = new TokenService_1.TokenService();
        const decoded = tokenService.verifyAccessToken(token);
        const userQueryRepository = new UserPrismaRepository_1.UserPrismaQueryRepository();
        const userPersistido = await userQueryRepository.findById(decoded.sub);
        if (!userPersistido || userPersistido.deletedAt) {
            throw new UnauthorizedError_1.UnauthorizedError();
        }
        if (userPersistido.passwordChangeAt &&
            decoded.iat * 1000 < userPersistido.passwordChangeAt.getTime()) {
            throw new UnauthorizedError_1.UnauthorizedError();
        }
        request.user = {
            id: userPersistido.id
        };
    }
    catch (error) {
        throw new UnauthorizedError_1.UnauthorizedError();
    }
}
//# sourceMappingURL=AuthMiddleware.js.map