import { describe, it, expect, beforeEach, vi } from "vitest"

import { RefreshTokenUseCase } from "../../src/core/application/useCases/RefreshTokenUseCase"

import type { IUserQueryRepository } from "../../src/interfaces/repositories/UserRepository"
import type {
  IRefreshTokenRepository,
  IRefreshTokenQueryRepository
} from "../../src/interfaces/repositories/RefreshTokenRepository"

import type { TokenService } from "../../src/core/domain/services/TokenService"

import { makeUserQueryRepositoryMock } from "../factories/user/MakeUserRepositories"

import { UnauthorizedError } from "../../src/core/domain/erros/UnauthorizedError"
import { UserNotFoundError } from "../../src/core/domain/erros/UserNotFoundError"
import { makePersistedUser } from "../factories/user/MakePersistedUser"

describe("RefreshTokenUseCase", () => {
  let userQueryRepository: IUserQueryRepository
  let refreshTokenRepository: IRefreshTokenRepository
  let refreshTokenQueryRepository: IRefreshTokenQueryRepository
  let tokenService: TokenService
  let sut: RefreshTokenUseCase

  beforeEach(() => {
    userQueryRepository = makeUserQueryRepositoryMock()

    refreshTokenRepository = {
      create: vi.fn(),
      revoke: vi.fn()
    } as unknown as IRefreshTokenRepository

    refreshTokenQueryRepository = {
      findByHash: vi.fn()
    } as unknown as IRefreshTokenQueryRepository

    tokenService = {
      hashToken: vi.fn(),
      generateAccessToken: vi.fn(),
      generateRefreshToken: vi.fn()
    } as unknown as TokenService

    sut = new RefreshTokenUseCase(
      userQueryRepository,
      refreshTokenRepository,
      refreshTokenQueryRepository,
      tokenService
    )

    vi.restoreAllMocks()
  })

  it("deve lançar UnauthorizedError se o refresh token não existir", async () => {
    ;(tokenService.hashToken as any).mockReturnValue("hashed-token")

    ;(refreshTokenQueryRepository.findByHash as any).mockResolvedValue(null)

    await expect(
      sut.execute("invalid-token")
    ).rejects.toBeInstanceOf(UnauthorizedError)

    expect(refreshTokenRepository.revoke).not.toHaveBeenCalled()
    expect(refreshTokenRepository.create).not.toHaveBeenCalled()
  })

  it("deve lançar UnauthorizedError se o refresh token estiver revogado", async () => {
    ;(tokenService.hashToken as any).mockReturnValue("hashed-token")

    ;(refreshTokenQueryRepository.findByHash as any).mockResolvedValue({
      id: "token-id",
      userId: "user-id",
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 10000),
      revokedAt: new Date()
    })

    await expect(
      sut.execute("valid-token")
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it("deve lançar UnauthorizedError se o refresh token estiver expirado", async () => {
    ;(tokenService.hashToken as any).mockReturnValue("hashed-token")

    ;(refreshTokenQueryRepository.findByHash as any).mockResolvedValue({
      id: "token-id",
      userId: "user-id",
      createdAt: new Date(),
      expiresAt: new Date(Date.now() - 1000),
      revokedAt: null
    })

    await expect(
      sut.execute("valid-token")
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it("deve lançar UserNotFoundError se o usuário não existir", async () => {
    ;(tokenService.hashToken as any).mockReturnValue("hashed-token")

    ;(refreshTokenQueryRepository.findByHash as any).mockResolvedValue({
      id: "token-id",
      userId: "user-id",
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 10000),
      revokedAt: null
    })

    userQueryRepository.findById = vi.fn().mockResolvedValue(null)

    await expect(
      sut.execute("valid-token")
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })

  it("deve lançar UnauthorizedError se a senha foi alterada após emissão do refresh token", async () => {
    ;(tokenService.hashToken as any).mockReturnValue("hashed-token")

    const createdAt = new Date(1000)

    ;(refreshTokenQueryRepository.findByHash as any).mockResolvedValue({
      id: "token-id",
      userId: "user-id",
      createdAt,
      expiresAt: new Date(Date.now() + 10000),
      revokedAt: null
    })

    userQueryRepository.findById = vi.fn().mockResolvedValue({
      id: "user-id",
      name: "USER NAME",
      email: "user@email.com",
      password: "hashed-password",
      passwordChangeAt: new Date(2000),
      deletedAt: null
    })

    await expect(
      sut.execute("valid-token")
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it("deve gerar novos tokens quando refresh token for válido", async () => {
    ;(tokenService.hashToken as any).mockReturnValue("hashed-token")

    const createdAt = new Date()

    ;(refreshTokenQueryRepository.findByHash as any).mockResolvedValue({
      id: "token-id",
      userId: "user-id",
      createdAt,
      expiresAt: new Date(Date.now() + 10000),
      revokedAt: null
    })

    userQueryRepository.findById = vi.fn().mockResolvedValue(
      makePersistedUser()
    )

    ;(tokenService.generateAccessToken as any).mockReturnValue("new-access-token")

    ;(tokenService.generateRefreshToken as any).mockReturnValue({
      token: "new-refresh-token",
      hash: "hashed-new-refresh",
      expiresAt: new Date()
    })

    const result = await sut.execute("valid-token")

    expect(refreshTokenRepository.revoke).toHaveBeenCalledWith("token-id")

    expect(refreshTokenRepository.create).toHaveBeenCalledWith({
      userId: "user-id",
      tokenHash: "hashed-new-refresh",
      expiresAt: expect.any(Date)
    })

    expect(tokenService.generateAccessToken).toHaveBeenCalledWith(
      "user-id",
      "USER NAME",
      "user@email.com",
      null
    )

    expect(result).toEqual({
      accessToken: "new-access-token",
      refreshToken: "new-refresh-token"
    })
  })
})
