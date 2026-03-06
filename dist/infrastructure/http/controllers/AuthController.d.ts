import type { FastifyReply, FastifyRequest } from "fastify";
import type { LoginUseCase } from "../../../core/application/useCases/LoginUseCase";
import type { LogoutUseCase } from "../../../core/application/useCases/LogoutUseCase";
interface AuthControllerDeps {
    loginUseCase: LoginUseCase;
    logoutUseCase: LogoutUseCase;
}
export declare class AuthController {
    private readonly deps;
    constructor(deps: AuthControllerDeps);
    login(request: FastifyRequest, reply: FastifyReply): Promise<never>;
    logout(request: FastifyRequest<{
        Body: {
            refreshToken: string;
        };
    }>, reply: FastifyReply): Promise<never>;
}
export {};
//# sourceMappingURL=AuthController.d.ts.map