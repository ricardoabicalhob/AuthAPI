import { describe, it, expect, beforeEach, vi } from "vitest"
import bcrypt from "bcrypt"

import type {
  IUserQueryRepository,
  IUserRepository
} from "../../src/interfaces/repositories/UserRepository"

import { ChangePasswordUseCase } from "../../src/core/application/useCases/ChangePasswordUseCase"

import {
  makeUserQueryRepositoryMock,
  makeUserRepositoryMock
} from "../factories/user/MakeUserRepositories"

import { UserNotFoundError } from "../../src/core/domain/erros/UserNotFoundError"
import { UnauthorizedError } from "../../src/core/domain/erros/UnauthorizedError"

import type { PasswordHasher } from "../../src/core/domain/services/PasswordHasher"
import { makePersistedUser } from "../factories/user/MakePersistedUser"

describe("ChangePasswordUseCase", () => {

  let userRepository: IUserRepository
  let userQueryRepository: IUserQueryRepository
  let hashService: PasswordHasher
  let sut: ChangePasswordUseCase

  beforeEach(() => {

    userRepository = makeUserRepositoryMock()
    userQueryRepository = makeUserQueryRepositoryMock()

    hashService = {
      hash: vi.fn()
    } as unknown as PasswordHasher

    sut = new ChangePasswordUseCase(
      userRepository,
      userQueryRepository,
      hashService
    )

    vi.restoreAllMocks()

  })

  it("deve alterar a senha quando a senha atual for válida", async () => {

    userQueryRepository.findById = vi.fn().mockResolvedValue(
      makePersistedUser()
    )

    vi.spyOn(bcrypt, "compare").mockResolvedValue(true as never)

    ;(hashService.hash as any).mockResolvedValue("hashed-new-password")

    await sut.execute(
      "user-id",
      "CurrentPassword1!",
      "NewPassword1!"
    )

    expect(bcrypt.compare).toHaveBeenCalledWith(
      "CurrentPassword1!",
      "hashed-password"
    )

    expect(hashService.hash).toHaveBeenCalledWith("NewPassword1!")

    expect(userRepository.updatePassword).toHaveBeenCalledWith(
      "user-id",
      "hashed-new-password",
      expect.any(Date)
    )

  })

  it("deve lançar UserNotFoundError se o usuário não existir", async () => {

    userQueryRepository.findById =
      vi.fn().mockResolvedValue(null)

    await expect(
      sut.execute("user-id", "CurrentPassword1!", "NewPassword1!")
    ).rejects.toBeInstanceOf(UserNotFoundError)

    expect(userRepository.updatePassword).not.toHaveBeenCalled()

  })

  it("deve lançar UnauthorizedError se a senha atual for inválida", async () => {

    userQueryRepository.findById = vi.fn().mockResolvedValue(
      makePersistedUser()
    )

    vi.spyOn(bcrypt, "compare").mockResolvedValue(false as never)

    await expect(
      sut.execute("user-id", "WrongPassword1!", "NewPassword1!")
    ).rejects.toBeInstanceOf(UnauthorizedError)

    expect(userRepository.updatePassword).not.toHaveBeenCalled()

  })

})