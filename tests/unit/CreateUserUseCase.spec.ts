import { describe, it, expect, beforeEach, vi } from "vitest"
import { CreateUserUseCase } from "../../src/core/application/useCases/CreateUserUseCase"
import { makeUserQueryRepositoryMock, makeUserRepositoryMock } from "../factories/user/MakeUserRepositories"
import type { IUserQueryRepository, IUserRepository } from "../../src/interfaces/repositories/UserRepository"
import { EmailAlreadyRegisteredError } from "../../src/core/domain/erros/EmailAlreadyRegisteredError"
import type { PasswordHasher } from "../../src/core/domain/services/PasswordHasher"

describe("CreateUserUseCase", () => {

  let userRepository: IUserRepository
  let userQueryRepository: IUserQueryRepository
  let hashService: PasswordHasher
  let sut: CreateUserUseCase

  beforeEach(() => {

    userRepository = makeUserRepositoryMock()
    userQueryRepository = makeUserQueryRepositoryMock()

    hashService = {
      hash: vi.fn()
    } as unknown as PasswordHasher

    sut = new CreateUserUseCase(
      userRepository,
      userQueryRepository,
      hashService
    )

  })

  it("deve criar um usuário com senha hasheada", async () => {

    userQueryRepository.findByEmail = vi.fn().mockResolvedValue(null)

    hashService.hash = vi.fn().mockResolvedValue("hashed-password")

    userRepository.create = vi.fn().mockResolvedValue({
      id: "user-id",
      name: "USER NAME",
      email: "user@email.com",
    })

    const result = await sut.execute({
      email: "user@email.com",
      name: "User Name",
      password: "Password1!"
    })

    expect(userQueryRepository.findByEmail)
      .toHaveBeenCalledWith("user@email.com")

    expect(hashService.hash)
      .toHaveBeenCalledWith("Password1!")

    expect(userRepository.create)
      .toHaveBeenCalled()

    expect(result).toEqual({
      id: "user-id",
      name: "USER NAME",
      email: "user@email.com",
    })

  })

  it("não deve permitir criar usuário com email já cadastrado", async () => {

    userQueryRepository.findByEmail = vi.fn().mockResolvedValue({
      id: "existing-id",
      email: "user@email.com",
      passwordChangeAt: null
    })

    await expect(
      sut.execute({
        email: "user@email.com",
        name: "User Name",
        password: "Password1!"
      })
    ).rejects.toBeInstanceOf(EmailAlreadyRegisteredError)

    expect(userQueryRepository.findByEmail)
      .toHaveBeenCalledWith("user@email.com")

    expect(hashService.hash)
      .not.toHaveBeenCalled()

    expect(userRepository.create)
      .not.toHaveBeenCalled()

  })

})