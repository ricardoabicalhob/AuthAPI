import { describe, it, expect, beforeEach, vi } from "vitest"

import { RefreshTokenUseCase } from "../../src/core/application/useCases/RefreshTokenUseCase"
import type { IUserQueryRepository } from "../../src/interfaces/repositories/UserRepository"
import type { TokenService } from "../../src/core/domain/services/TokenService"

import { makeUserQueryRepositoryMock } from "../factories/user/MakeUserRepositories"
import { UnauthorizedError } from "../../src/core/domain/erros/UnauthorizedError"
import { UserNotFoundError } from "../../src/core/domain/erros/UserNotFoundError"

describe("RefreshTokenUseCase", () => {
  let userQueryRepository: IUserQueryRepository
  let tokenService: TokenService
  let sut: RefreshTokenUseCase

  beforeEach(() => {
    userQueryRepository = makeUserQueryRepositoryMock()

    tokenService = {
      verifyRefreshToken: vi.fn(),
      generateAccessToken: vi.fn()
    } as unknown as TokenService

    sut = new RefreshTokenUseCase(
      userQueryRepository,
      tokenService
    )

    vi.restoreAllMocks()
  })

  it("deve lançar UnauthorizedError se o refresh token for inválido", async () => {
    ;(tokenService.verifyRefreshToken as any).mockImplementation(() => {
      throw new Error("invalid")
    })

    await expect(
      sut.execute("invalid-refresh-token")
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it("deve lançar UserNotFoundError se o usuário não for encontrado", async () => {
    ;(tokenService.verifyRefreshToken as any).mockReturnValue({
      sub: "user-id"
    })

    userQueryRepository.findById = vi.fn().mockResolvedValue(null)

    await expect(
      sut.execute("valid-refresh-token")
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })

  it("deve lançar UnauthorizedError se a senha foi alterada após a emissão do refresh token", async () => {
    ;(tokenService.verifyRefreshToken as any).mockReturnValue({
      sub: "user-id",
      passwordChangeAt: 1000
    })

    userQueryRepository.findById = vi.fn().mockResolvedValue({
      id: "user-id",
      email: "user@email.com",
      passwordChangeAt: new Date(2000 * 1000),
      deletedAt: null
    })

    await expect(
      sut.execute("valid-refresh-token")
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it("deve gerar novo access token quando refresh token for válido", async () => {
    ;(tokenService.verifyRefreshToken as any).mockReturnValue({
      sub: "user-id",
      passwordChangeAt: 2000
    })

    const passwordChangeAt = new Date(2000 * 1000)

    userQueryRepository.findById = vi.fn().mockResolvedValue({
      id: "user-id",
      email: "user@email.com",
      passwordChangeAt,
      deletedAt: null
    })

    ;(tokenService.generateAccessToken as any).mockReturnValue("new-access-token")

    const result = await sut.execute("valid-refresh-token")

    expect(tokenService.generateAccessToken).toHaveBeenCalledWith(
      "user-id",
      passwordChangeAt
    )

    expect(result).toEqual({
      accessToken: "new-access-token"
    })
  })
})
