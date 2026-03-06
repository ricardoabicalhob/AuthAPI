import { describe, it, expect, beforeEach, vi } from "vitest";
import { CreateUserUseCase } from "../../src/core/application/useCases/CreateUserUseCase";
import { makeUserQueryRepositoryMock, makeUserRepositoryMock } from "../factories/user/MakeUserRepositories";
import { EmailAlreadyRegisteredError } from "../../src/core/domain/erros/EmailAlreadyRegisteredError";
describe("CreateUserUseCase", () => {
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
        sut = new CreateUserUseCase(userRepository, userQueryRepository, hashService);
    });
    it("deve criar um usuário com senha hasheada", async () => {
        userQueryRepository.findByEmail = vi.fn().mockResolvedValue(null);
        hashService.hash = vi.fn().mockResolvedValue("hashed-password");
        userRepository.create = vi.fn().mockResolvedValue({
            id: "user-id",
            email: "user@email.com",
        });
        const result = await sut.execute({
            email: "user@email.com",
            password: "12345678"
        });
        expect(userQueryRepository.findByEmail).toHaveBeenCalledWith("user@email.com");
        expect(hashService.hash).toHaveBeenCalledWith("12345678");
        expect(userRepository.create).toHaveBeenCalledWith("user@email.com", "hashed-password");
        expect(result).toEqual({
            id: "user-id",
            email: "user@email.com",
        });
    });
    it("não deve permitir criar usuário com email já cadastrado", async () => {
        userQueryRepository.findByEmail = vi.fn().mockResolvedValue({
            id: "existing-id",
            email: "user@email.com",
            passwordChangeAt: null
        });
        await expect(sut.execute({
            email: "user@email.com",
            password: "12345678"
        })).rejects.toBeInstanceOf(EmailAlreadyRegisteredError);
        expect(userQueryRepository.findByEmail).toHaveBeenCalledWith("user@email.com");
        expect(hashService.hash).not.toHaveBeenCalled();
        expect(userRepository.create).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=CreateUserUseCase.spec.js.map