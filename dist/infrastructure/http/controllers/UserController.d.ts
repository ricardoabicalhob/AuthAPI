import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateUserUseCase } from "../../../core/application/useCases/CreateUserUseCase";
import type { RequestPasswordResetUseCase } from "../../../core/application/useCases/RequestPasswordResetUseCase";
import type { ResetPasswordUseCase } from "../../../core/application/useCases/ResetPasswordUseCase";
import type { ChangePasswordUseCase } from "../../../core/application/useCases/ChangePasswordUseCase";
import type { DeleteUserUseCase } from "../../../core/application/useCases/DeleteUserUseCase";
export declare class UserController {
    private readonly createUserUseCase;
    private readonly requestPasswordResetUseCase;
    private readonly resetPasswordUseCase;
    private readonly changePasswordUseCase;
    private readonly deleteUserUseCase;
    constructor(createUserUseCase: CreateUserUseCase, requestPasswordResetUseCase: RequestPasswordResetUseCase, resetPasswordUseCase: ResetPasswordUseCase, changePasswordUseCase: ChangePasswordUseCase, deleteUserUseCase: DeleteUserUseCase);
    create(request: FastifyRequest<{
        Body: {
            email: string;
            name: string;
            password: string;
        };
    }>, reply: FastifyReply): Promise<never>;
    deleteUser(request: FastifyRequest, reply: FastifyReply): Promise<never>;
    changePassword(request: FastifyRequest, reply: FastifyReply): Promise<never>;
    requestPasswordReset(request: FastifyRequest, reply: FastifyReply): Promise<never>;
    resetPassword(request: FastifyRequest, reply: FastifyReply): Promise<never>;
}
//# sourceMappingURL=UserController.d.ts.map