"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    deps;
    constructor(deps) {
        this.deps = deps;
    }
    async login(request, reply) {
        const { email, password } = request.body;
        const result = await this.deps.loginUseCase.execute(email, password);
        return reply.status(200).send(result);
    }
    async logout(request, reply) {
        const { refreshToken } = request.body;
        await this.deps.logoutUseCase.execute(refreshToken);
        return reply.status(204).send();
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map