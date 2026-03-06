import type { FastifyReply, FastifyRequest } from "fastify";
import type { RefreshTokenUseCase } from "../../../core/application/useCases/RefreshTokenUseCase";
export declare class RefreshTokenController {
    private readonly refreshTokenUseCase;
    constructor(refreshTokenUseCase: RefreshTokenUseCase);
    handle(request: FastifyRequest<{
        Body: {
            refreshToken: string;
        };
    }>, reply: FastifyReply): Promise<never>;
}
//# sourceMappingURL=RefreshTokenController.d.ts.map