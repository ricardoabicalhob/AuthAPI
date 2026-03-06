"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestPasswordResetUseCase = void 0;
class RequestPasswordResetUseCase {
    userRepository;
    userQueryRepository;
    tokenService;
    mailService;
    constructor(userRepository, userQueryRepository, tokenService, mailService) {
        this.userRepository = userRepository;
        this.userQueryRepository = userQueryRepository;
        this.tokenService = tokenService;
        this.mailService = mailService;
    }
    async execute(email) {
        const user = await this.userQueryRepository.findByEmail(email);
        if (!user)
            return;
        const { token, hash } = this.tokenService.generateResetToken();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
        await this.userRepository.savePasswordResetToken(user.id, hash, expiresAt);
        const resetLink = process.env.FRONTEND_URL + `?token=${token}` || `http://localhost:5173?token=${token}`;
        await this.mailService.sendPasswordReset(user.email, resetLink);
    }
}
exports.RequestPasswordResetUseCase = RequestPasswordResetUseCase;
//# sourceMappingURL=RequestPasswordResetUseCase.js.map