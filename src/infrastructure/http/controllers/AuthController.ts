import type { FastifyReply, FastifyRequest } from "fastify";
import type { LoginUseCase } from "../../../core/application/useCases/LoginUseCase";
import type { LogoutUseCase } from "../../../core/application/useCases/LogoutUseCase";

interface AuthControllerDeps {
    loginUseCase :LoginUseCase
    logoutUseCase :LogoutUseCase
}

export class AuthController {
    constructor(
        private readonly deps :AuthControllerDeps
    ) {}

    async login(request :FastifyRequest, reply :FastifyReply) {
        const { email, password } = request.body as {
            email :string,
            password :string
        }

        const result = await this.deps.loginUseCase.execute(email, password)
        return reply.status(200).send(result)
    }

    async logout(request :FastifyRequest<{
        Body: {
            refreshToken :string
        }
    }>, reply :FastifyReply) {
        const { refreshToken } = request.body

        await this.deps.logoutUseCase.execute(refreshToken)
        return reply.status(204).send()
    }
}