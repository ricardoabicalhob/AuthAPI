import { describe, it, expect, beforeEach, vi } from "vitest";
import {} from "vitest";
import bcrypt from "bcrypt";
import { ChangePasswordUseCase } from "../../src/core/application/useCases/ChangePasswordUseCase";
import { makeUserQueryRepositoryMock, makeUserRepositoryMock } from "../factories/user/MakeUserRepositories";
import { UserNotFoundError } from "../../src/core/domain/erros/UserNotFoundError";
import { UnauthorizedError } from "../../src/core/domain/erros/UnauthorizedError";
describe("ChangePasswordUseCase", () => {
    let userRepository;
    let userQueryRepository;
    let hashService;
    let sut;
    beforeEach(() => {
        userRepository = makeUserRepositoryMock();
        userQueryRepository = makeUserQueryRepositoryMock();
        hashService = {
            hash: vi.fn()
        };
        sut = new ChangePasswordUseCase(userRepository, userQueryRepository, hashService);
        vi.restoreAllMocks();
    });
    it("deve alterar a senha quando a senha atual for válida", async () => {
        userQueryRepository.findUserWithPasswordById = vi.fn().mockResolvedValue({
            id: "user-id",
            email: "user@email.com",
            password: "hashed-current-password"
        });
        vi
            .spyOn(bcrypt, "compare")
            .mockImplementation(() => Promise.resolve(true));
        hashService.hash.mockResolvedValue("hashed-new-password");
        await sut.execute("user-id", "current-password", "new-password");
        expect(bcrypt.compare).toHaveBeenCalledWith("current-password", "hashed-current-password");
        expect(hashService.hash).toHaveBeenCalledWith("new-password");
        expect(userRepository.updatePassword).toHaveBeenCalledWith("user-id", "hashed-new-password");
    });
    it("deve lançar UserNotFoundError se o usuário não existir", async () => {
        userQueryRepository.findUserWithPasswordById = vi.fn().mockResolvedValue(null);
        await expect(sut.execute("user-id", "current-password", "new-password")).rejects.toBeInstanceOf(UserNotFoundError);
        expect(userRepository.updatePassword).not.toHaveBeenCalled();
    });
    it("deve lançar UnauthorizedError se a senha atual for inválida", async () => {
        userQueryRepository.findUserWithPasswordById = vi.fn().mockResolvedValue({
            id: "user-id",
            email: "user@email.com",
            password: "hashed-current-password"
        });
        vi
            .spyOn(bcrypt, "compare")
            .mockImplementation(() => Promise.resolve(false));
        await expect(sut.execute("user-id", "wrong-password", "new-password")).rejects.toBeInstanceOf(UnauthorizedError);
        expect(userRepository.updatePassword).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=ChangePasswordUseCase.spec.js.map