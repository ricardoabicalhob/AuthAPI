import type { FastifyReply, FastifyRequest } from "fastify";
import type { GetJwksUseCase } from "../../../core/application/useCases/GetJwksUseCase";
export declare class GetJwksController {
    private readonly getJwksUseCase;
    constructor(getJwksUseCase: GetJwksUseCase);
    handle(_: FastifyRequest, reply: FastifyReply): Promise<never>;
}
//# sourceMappingURL=GetJwksController.d.ts.map