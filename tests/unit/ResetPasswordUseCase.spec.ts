import { describe, it, expect, beforeEach, vi } from "vitest"

import { ResetPasswordUseCase } from "../../src/core/application/useCases/ResetPasswordUseCase"

import type {
  IUserRepository,
  IUserQueryRepository
} from "../../src/interfaces/repositories/UserRepository"

import type { PasswordHasher } from "../../src/core/domain/services/PasswordHasher"
import type { TokenHashService } from "../../src/core/domain/services/TokenHashService"

import {
  makeUserRepositoryMock,
  makeUserQueryRepositoryMock
} from "../factories/user/MakeUserRepositories"

import { UnauthorizedError } from "../../src/core/domain/erros/UnauthorizedError"

describe("ResetPasswordUseCase", () => {

  let userRepository: IUserRepository
  let userQueryRepository: IUserQueryRepository
  let hashService: PasswordHasher
  let tokenHashService: TokenHashService
  let sut: ResetPasswordUseCase

  beforeEach(() => {

    userRepository = makeUserRepositoryMock()
    userQueryRepository = makeUserQueryRepositoryMock()

    hashService = {
      hash: vi.fn()
    } as unknown as PasswordHasher

    tokenHashService = {
      hash: vi.fn()
    } as unknown as TokenHashService

    sut = new ResetPasswordUseCase(
      userRepository,
      userQueryRepository,
      hashService,
      tokenHashService
    )

    vi.restoreAllMocks()

  })

  it("deve lançar UnauthorizedError se o token for inválido", async () => {

    ;(tokenHashService.hash as any).mockReturnValue("hashed-token")

    userQueryRepository.findByPasswordResetToken = vi
      .fn()
      .mockResolvedValue(null)

    await expect(
      sut.execute("invalid-token", "NewPassword1!")
    ).rejects.toBeInstanceOf(UnauthorizedError)

    expect(userRepository.updatePassword).not.toHaveBeenCalled()
    expect(userRepository.clearPasswordResetToken).not.toHaveBeenCalled()

  })

  it("deve resetar a senha e invalidar o token quando o token for válido", async () => {

    ;(tokenHashService.hash as any).mockReturnValue("hashed-token")

    userQueryRepository.findByPasswordResetToken = vi
      .fn()
      .mockResolvedValue({
        id: "user-id",
        email: "user@email.com",
        name: "USER NAME",
        password: "old-hash",
        passwordChangeAt: null,
        deletedAt: null,
        passwordResetToken: "hashed-token",
        passwordResetExpiresAt: new Date()
      })

    ;(hashService.hash as any).mockResolvedValue("hashed-new-password")

    await sut.execute(
      "valid-token",
      "NewPassword1!"
    )

    expect(tokenHashService.hash)
      .toHaveBeenCalledWith("valid-token")

    expect(userQueryRepository.findByPasswordResetToken)
      .toHaveBeenCalledWith("hashed-token")

    expect(hashService.hash)
      .toHaveBeenCalledWith("NewPassword1!")

    expect(userRepository.updatePassword)
      .toHaveBeenCalledWith(
        "user-id",
        "hashed-new-password",
        expect.any(Date)
      )

    expect(userRepository.clearPasswordResetToken)
      .toHaveBeenCalledWith(
        "user-id",
        null,
        null
      )

  })

})