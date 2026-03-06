"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    createUserUseCase;
    requestPasswordResetUseCase;
    resetPasswordUseCase;
    changePasswordUseCase;
    deleteUserUseCase;
    constructor(createUserUseCase, requestPasswordResetUseCase, resetPasswordUseCase, changePasswordUseCase, deleteUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.requestPasswordResetUseCase = requestPasswordResetUseCase;
        this.resetPasswordUseCase = resetPasswordUseCase;
        this.changePasswordUseCase = changePasswordUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
    }
    async create(request, reply) {
        const { email, name, password } = request.body;
        const user = await this.createUserUseCase.execute({
            email,
            name,
            password
        });
        return reply.status(201).send(user);
    }
    async deleteUser(request, reply) {
        const userId = request.user.id;
        await this.deleteUserUseCase.execute(userId);
        return reply.status(204).send();
    }
    async changePassword(request, reply) {
        const { currentPassword, newPassword } = request.body;
        const userId = request.user.id;
        await this.changePasswordUseCase.execute(userId, currentPassword, newPassword);
        return reply.status(204).send();
    }
    async requestPasswordReset(request, reply) {
        const { email } = request.body;
        await this.requestPasswordResetUseCase.execute(email);
        return reply.status(204).send();
    }
    async resetPassword(request, reply) {
        const { token, password } = request.body;
        await this.resetPasswordUseCase.execute(token, password);
        return reply.status(204).send();
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map