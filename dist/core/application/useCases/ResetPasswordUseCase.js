"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordUseCase = void 0;
const UnauthorizedError_1 = require("../../domain/erros/UnauthorizedError");
const UserMapper_1 = require("../mappers/UserMapper");
class ResetPasswordUseCase {
    userRepository;
    userQueryRepository;
    hashService;
    tokenHashService;
    constructor(userRepository, userQueryRepository, hashService, tokenHashService) {
        this.userRepository = userRepository;
        this.userQueryRepository = userQueryRepository;
        this.hashService = hashService;
        this.tokenHashService = tokenHashService;
    }
    async execute(token, newPassword) {
        const tokenHash = this.tokenHashService.hash(token);
        const userPersistido = await this.userQueryRepository.findByPasswordResetToken(tokenHash);
        if (!userPersistido) {
            throw new UnauthorizedError_1.UnauthorizedError();
        }
        const user = UserMapper_1.UserMapper.toDomain(userPersistido);
        const passwordHash = await this.hashService.hash(newPassword);
        user.changePassword(passwordHash);
        user.clearPasswordResetToken();
        await this.userRepository.updatePassword(user.getId(), user.getPassword(), user.getPasswordChangeAtOrThrow());
        await this.userRepository.clearPasswordResetToken(user.getId(), user.getPasswordResetTokenOrThrow(), user.getPasswordResetExpiresAtOrThrow());
    }
}
exports.ResetPasswordUseCase = ResetPasswordUseCase;
//# sourceMappingURL=ResetPasswordUseCase.js.map