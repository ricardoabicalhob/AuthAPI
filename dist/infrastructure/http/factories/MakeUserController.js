"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserController = makeUserController;
const PasswordHasher_1 = require("../../../core/domain/services/PasswordHasher");
const MailService_1 = require("../../../core/domain/services/MailService");
const TokenHashService_1 = require("../../../core/domain/services/TokenHashService");
const TokenService_1 = require("../../../core/domain/services/TokenService");
const ChangePasswordUseCase_1 = require("../../../core/application/useCases/ChangePasswordUseCase");
const CreateUserUseCase_1 = require("../../../core/application/useCases/CreateUserUseCase");
const DeleteUserUseCase_1 = require("../../../core/application/useCases/DeleteUserUseCase");
const RequestPasswordResetUseCase_1 = require("../../../core/application/useCases/RequestPasswordResetUseCase");
const ResetPasswordUseCase_1 = require("../../../core/application/useCases/ResetPasswordUseCase");
const UserPrismaRepository_1 = require("../../database/UserPrismaRepository");
const UserController_1 = require("../controllers/UserController");
function makeUserController() {
    const userRepository = new UserPrismaRepository_1.UserPrismaRepository();
    const userQueryRepository = new UserPrismaRepository_1.UserPrismaQueryRepository();
    const hashService = new PasswordHasher_1.PasswordHasher();
    const tokenHashService = new TokenHashService_1.TokenHashService();
    const mailService = new MailService_1.MailService();
    const tokenService = new TokenService_1.TokenService();
    const createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(userRepository, userQueryRepository, hashService);
    const requestPasswordResetUseCase = new RequestPasswordResetUseCase_1.RequestPasswordResetUseCase(userRepository, userQueryRepository, tokenService, mailService);
    const resetPasswordUseCase = new ResetPasswordUseCase_1.ResetPasswordUseCase(userRepository, userQueryRepository, hashService, tokenHashService);
    const changePasswordUseCase = new ChangePasswordUseCase_1.ChangePasswordUseCase(userRepository, userQueryRepository, hashService);
    const deleteUserUseCase = new DeleteUserUseCase_1.DeleteUserUseCase(userRepository, userQueryRepository);
    return new UserController_1.UserController(createUserUseCase, requestPasswordResetUseCase, resetPasswordUseCase, changePasswordUseCase, deleteUserUseCase);
}
//# sourceMappingURL=MakeUserController.js.map