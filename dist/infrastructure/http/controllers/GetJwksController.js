"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetJwksController = void 0;
class GetJwksController {
    getJwksUseCase;
    constructor(getJwksUseCase) {
        this.getJwksUseCase = getJwksUseCase;
    }
    async handle(_, reply) {
        const jwks = await this.getJwksUseCase.execute();
        return reply.status(200).send(jwks);
    }
}
exports.GetJwksController = GetJwksController;
//# sourceMappingURL=GetJwksController.js.map