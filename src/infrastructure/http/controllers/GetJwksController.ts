import type { FastifyReply, FastifyRequest } from "fastify";
import type { GetJwksUseCase } from "../../../core/application/useCases/GetJwksUseCase";

export class GetJwksController {
    constructor(private readonly getJwksUseCase :GetJwksUseCase) {}

    async handle(_ :FastifyRequest, reply :FastifyReply) {
        const jwks = await this.getJwksUseCase.execute()
        
        return reply.status(200).send(jwks)
    }
}