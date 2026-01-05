import { describe, it, expect, beforeEach, vi } from "vitest"

import { RequestPasswordResetUseCase } from "../../src/core/useCases/RequestPasswordResetUseCase"
import type { IUserRepository, IUserQueryRepository } from "../../src/interfaces/repositories/UserRepository"
import type { TokenService } from "../../src/core/services/TokenService"
import type { MailService } from "../../src/core/services/MailService"

import {
  makeUserRepositoryMock,
  makeUserQueryRepositoryMock
} from "../factories/user/MakeUserRepositories"

describe("RequestPasswordResetUseCase", () => {
  let userRepository: IUserRepository
  let userQueryRepository: IUserQueryRepository
  let tokenService: TokenService
  let mailService: MailService
  let sut: RequestPasswordResetUseCase

  beforeEach(() => {
    userRepository = makeUserRepositoryMock()
    userQueryRepository = makeUserQueryRepositoryMock()

    tokenService = {
      generateResetToken: vi.fn()
    } as unknown as TokenService

    mailService = {
      sendPasswordReset: vi.fn()
    } as unknown as MailService

    sut = new RequestPasswordResetUseCase(
      userRepository,
      userQueryRepository,
      tokenService,
      mailService
    )

    vi.restoreAllMocks()
  })

  it("não deve fazer nada se o usuário não existir", async () => {
    userQueryRepository.findByEmail = vi.fn().mockResolvedValue(null)

    await sut.execute("user@email.com")

    expect(userRepository.savePasswordResetToken).not.toHaveBeenCalled()
    expect(mailService.sendPasswordReset).not.toHaveBeenCalled()
  })

  it("deve gerar token, salvar hash e enviar e-mail quando usuário existir", async () => {
    userQueryRepository.findByEmail = vi.fn().mockResolvedValue({
      id: "user-id",
      email: "user@email.com",
      passwordChangeAt: null,
      deletedAt: null
    })

    ;(tokenService.generateResetToken as any).mockReturnValue({
      token: "plain-reset-token",
      hash: "hashed-reset-token"
    })

    const nowSpy = vi.spyOn(Date, "now").mockReturnValue(1_000_000)

    await sut.execute("user@email.com")

    expect(tokenService.generateResetToken).toHaveBeenCalled()

    expect(userRepository.savePasswordResetToken).toHaveBeenCalledWith(
      "user-id",
      "hashed-reset-token",
      new Date(1_000_000 + 15 * 60 * 1000)
    )

    expect(mailService.sendPasswordReset).toHaveBeenCalledWith(
      "user@email.com",
      "https://app.exemplo.com/reset-password?token=plain-reset-token"
    )

    nowSpy.mockRestore()
  })
})
