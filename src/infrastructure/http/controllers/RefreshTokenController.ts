import type { FastifyReply, FastifyRequest } from "fastify";
import type { RefreshTokenUseCase } from "../../../core/application/useCases/RefreshTokenUseCase";

export class RefreshTokenController {
    constructor(
        private readonly refreshTokenUseCase :RefreshTokenUseCase
    ) {}

    async handle(request :FastifyRequest<{
        Body: {
            refreshToken :string
        }
    }>, reply :FastifyReply) {
        const { refreshToken } = request.body

        const result = await this.refreshTokenUseCase.execute(refreshToken)

        return reply.status(200).send(result)
    }
}