import { describe, it, expect, beforeEach, vi } from "vitest";
import { DeleteUserUseCase } from "../../src/core/application/useCases/DeleteUserUseCase";
import { UserNotFoundError } from "../../src/core/domain/erros/UserNotFoundError";
import { makeUserRepositoryMock, makeUserQueryRepositoryMock } from "../factories/user/MakeUserRepositories";
describe("DeleteUserUseCase", () => {
    let userRepository;
    let userQueryRepository;
    let sut;
    beforeEach(() => {
        userRepository = makeUserRepositoryMock();
        userQueryRepository = makeUserQueryRepositoryMock();
        sut = new DeleteUserUseCase(userRepository, userQueryRepository);
        vi.restoreAllMocks();
    });
    it("deve deletar o usuário quando ele existir", async () => {
        userQueryRepository.findById = vi.fn().mockResolvedValue({
            id: "user-id",
            email: "user@email.com",
            deletedAt: null,
            passwordChangeAt: null
        });
        await sut.execute("user-id");
        expect(userRepository.softDelete).toHaveBeenCalledWith("user-id");
    });
    it("deve lançar UserNotFoundError se o usuário não existir", async () => {
        userQueryRepository.findById = vi.fn().mockResolvedValue(null);
        await expect(sut.execute("user-id")).rejects.toBeInstanceOf(UserNotFoundError);
        expect(userRepository.softDelete).not.toHaveBeenCalled();
    });
    it("deve lançar UserNotFoundError se o usuário já estiver deletado", async () => {
        userQueryRepository.findById = vi.fn().mockResolvedValue({
            id: "user-id",
            email: "user@email.com",
            deletedAt: new Date(),
            passwordChangeAt: null
        });
        await expect(sut.execute("user-id")).rejects.toBeInstanceOf(UserNotFoundError);
        expect(userRepository.softDelete).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=DeleteUserUseCase.spec.js.map