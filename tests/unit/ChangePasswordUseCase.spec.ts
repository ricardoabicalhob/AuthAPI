import { describe, it, expect, beforeEach, vi } from "vitest"
import { type Mock } from "vitest"
import bcrypt from "bcrypt"

import type {
  IUserQueryRepository,
  IUserRepository
} from "../../src/interfaces/repositories/UserRepository"

import type { HashService } from "../../src/core/services/HashService"
import { ChangePasswordUseCase } from "../../src/core/useCases/ChangePasswordUseCase"

import {
  makeUserQueryRepositoryMock,
  makeUserRepositoryMock
} from "../factories/user/MakeUserRepositories"
import { UserNotFoundError } from "../../src/core/erros/UserNotFoundError"
import { UnauthorizedError } from "../../src/core/erros/UnauthorizedError"

describe("ChangePasswordUseCase", () => {
  let userRepository: IUserRepository
  let userQueryRepository: IUserQueryRepository
  let hashService: HashService
  let sut: ChangePasswordUseCase

  beforeEach(() => {
    userRepository = makeUserRepositoryMock()
    userQueryRepository = makeUserQueryRepositoryMock()

    hashService = {
      hash: vi.fn()
    } as unknown as HashService

    sut = new ChangePasswordUseCase(
      userRepository,
      userQueryRepository,
      hashService
    )

    vi.restoreAllMocks()
  })

  it("deve alterar a senha quando a senha atual for válida", async () => {
    userQueryRepository.findUserWithPasswordById = vi.fn().mockResolvedValue({
      id: "user-id",
      email: "user@email.com",
      password: "hashed-current-password"
    })

    vi
      .spyOn(bcrypt, "compare")
      .mockImplementation(() => Promise.resolve(true))

    ;(hashService.hash as Mock).mockResolvedValue("hashed-new-password")

    await sut.execute(
      "user-id",
      "current-password",
      "new-password"
    )

    expect(bcrypt.compare).toHaveBeenCalledWith(
      "current-password",
      "hashed-current-password"
    )

    expect(hashService.hash).toHaveBeenCalledWith("new-password")

    expect(userRepository.updatePassword).toHaveBeenCalledWith(
      "user-id",
      "hashed-new-password"
    )
  })

  it("deve lançar UserNotFoundError se o usuário não existir", async () => {
    userQueryRepository.findUserWithPasswordById = vi.fn().mockResolvedValue(null)

    await expect(
      sut.execute("user-id", "current-password", "new-password")
    ).rejects.toBeInstanceOf(UserNotFoundError)

    expect(userRepository.updatePassword).not.toHaveBeenCalled()
  })

  it("deve lançar UnauthorizedError se a senha atual for inválida", async () => {
    userQueryRepository.findUserWithPasswordById = vi.fn().mockResolvedValue({
      id: "user-id",
      email: "user@email.com",
      password: "hashed-current-password"
    })

    vi
      .spyOn(bcrypt, "compare")
      .mockImplementation(() => Promise.resolve(false))

    await expect(
      sut.execute("user-id", "wrong-password", "new-password")
    ).rejects.toBeInstanceOf(UnauthorizedError)

    expect(userRepository.updatePassword).not.toHaveBeenCalled()
  })
})
