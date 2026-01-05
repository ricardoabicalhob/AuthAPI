import type { FastifyReply, FastifyRequest } from "fastify";
import type { RefreshTokenUseCase } from "../../../core/useCases/RefreshTokenUseCase";

export class RefreshTokenController {
    constructor(
        private readonly refreshTokenUseCase :RefreshTokenUseCase
    ) {}

    async handle(request :FastifyRequest, reply :FastifyReply) {
        const { refreshToken } = request.body as {
            refreshToken :string
        }

        const result = await this.refreshTokenUseCase.execute(refreshToken)

        return reply.status(200).send(result)
    }
}