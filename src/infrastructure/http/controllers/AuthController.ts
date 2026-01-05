import type { FastifyReply, FastifyRequest } from "fastify";
import type { LoginUseCase } from "../../../core/useCases/LoginUseCase";

export class AuthController {
    constructor(
        private readonly loginUseCase :LoginUseCase
    ) {}

    async login(request :FastifyRequest, reply :FastifyReply) {
        const { email, password } = request.body as {
            email :string,
            password :string
        }

        const result = await this.loginUseCase.execute(email, password)
        return reply.status(200).send(result)
    }
}