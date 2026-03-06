import { describe, it, expect, beforeEach, vi } from "vitest";
import { ResetPasswordUseCase } from "../../src/core/application/useCases/ResetPasswordUseCase";
import { makeUserRepositoryMock, makeUserQueryRepositoryMock } from "../factories/user/MakeUserRepositories";
import { UnauthorizedError } from "../../src/core/domain/erros/UnauthorizedError";
describe("ResetPasswordUseCase", () => {
    let userRepository;
    let userQueryRepository;
    let hashService;
    let tokenHashService;
    let sut;
    beforeEach(() => {
        userRepository = makeUserRepositoryMock();
        userQueryRepository = makeUserQueryRepositoryMock();
        hashService = {
            hash: vi.fn()
        };
        tokenHashService = {
            hash: vi.fn()
        };
        sut = new ResetPasswordUseCase(userRepository, userQueryRepository, hashService, tokenHashService);
        vi.restoreAllMocks();
    });
    it("deve lançar UnauthorizedError se o token for inválido ou expirado", async () => {
        ;
        tokenHashService.hash.mockReturnValue("hashed-token");
        userQueryRepository.findByPasswordResetToken = vi
            .fn()
            .mockResolvedValue(null);
        await expect(sut.execute("invalid-token", "new-password")).rejects.toBeInstanceOf(UnauthorizedError);
        expect(userRepository.updatePassword).not.toHaveBeenCalled();
        expect(userRepository.clearPasswordResetToken).not.toHaveBeenCalled();
    });
    it("deve resetar a senha e invalidar o token quando o token for válido", async () => {
        ;
        tokenHashService.hash.mockReturnValue("hashed-token");
        userQueryRepository.findByPasswordResetToken = vi
            .fn()
            .mockResolvedValue({ id: "user-id" });
        hashService.hash.mockResolvedValue("hashed-new-password");
        await sut.execute("valid-token", "new-password");
        expect(tokenHashService.hash).toHaveBeenCalledWith("valid-token");
        expect(userQueryRepository.findByPasswordResetToken).toHaveBeenCalledWith("hashed-token");
        expect(hashService.hash).toHaveBeenCalledWith("new-password");
        expect(userRepository.updatePassword).toHaveBeenCalledWith("user-id", "hashed-new-password");
        expect(userRepository.clearPasswordResetToken).toHaveBeenCalledWith("user-id");
    });
});
//# sourceMappingURL=ResetPasswordUseCase.spec.js.map