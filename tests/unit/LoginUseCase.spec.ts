import { describe, it, expect, beforeEach, vi } from "vitest"
import bcrypt from "bcrypt"

import { LoginUseCase } from "../../src/core/application/useCases/LoginUseCase"

import type { IUserQueryRepository } from "../../src/interfaces/repositories/UserRepository"
import type { IRefreshTokenRepository } from "../../src/interfaces/repositories/RefreshTokenRepository"
import type { TokenService } from "../../src/core/domain/services/TokenService"

import { InvalidCredentialsError } from "../../src/core/domain/erros/InvalidCredentialError"
import { UnauthorizedError } from "../../src/core/domain/erros/UnauthorizedError"
import { UserNotFoundError } from "../../src/core/domain/erros/UserNotFoundError"

import { makeUserQueryRepositoryMock } from "../factories/user/MakeUserRepositories"
import { makeRefreshTokenRepositoryMock } from "../factories/user/MakeRefreshTokenRepository"
import { makePersistedUser } from "../factories/user/MakePersistedUser"

describe("LoginUseCase", () => {

  let userQueryRepository: IUserQueryRepository
  let refreshTokenRepository: IRefreshTokenRepository
  let tokenService: TokenService
  let sut: LoginUseCase

  beforeEach(() => {

    userQueryRepository = makeUserQueryRepositoryMock()
    refreshTokenRepository = makeRefreshTokenRepositoryMock()

    tokenService = {
      generateAccessToken: vi.fn(),
      generateRefreshToken: vi.fn()
    } as unknown as TokenService

    sut = new LoginUseCase(
      userQueryRepository,
      refreshTokenRepository,
      tokenService
    )

    vi.restoreAllMocks()

  })

  it("deve retornar tokens quando credenciais forem válidas", async () => {

    userQueryRepository.findByEmail = vi.fn().mockResolvedValue(
      makePersistedUser()
    )

    vi.spyOn(bcrypt, "compare").mockResolvedValue(true as never)

    ;(tokenService.generateAccessToken as any).mockReturnValue("access-token")

    ;(tokenService.generateRefreshToken as any).mockReturnValue({
      token: "refresh-token",
      hash: "hashed-refresh-token",
      expiresAt: new Date()
    })

    const result = await sut.execute(
      "user@email.com",
      "plain-password"
    )

    expect(bcrypt.compare).toHaveBeenCalledWith(
      "plain-password",
      "hashed-password"
    )

    expect(tokenService.generateAccessToken).toHaveBeenCalledWith(
      "user-id",
      "USER NAME",
      "user@email.com",
      null
    )

    expect(refreshTokenRepository.create).toHaveBeenCalledWith({
      userId: "user-id",
      tokenHash: "hashed-refresh-token",
      expiresAt: expect.any(Date)
    })

    expect(result).toEqual({
      accessToken: "access-token",
      refreshToken: "refresh-token"
    })

  })

  it("deve lançar UnauthorizedError se o email não existir", async () => {

    userQueryRepository.findByEmail = vi.fn().mockResolvedValue(null)

    await expect(
      sut.execute("user@email.com", "password")
    ).rejects.toBeInstanceOf(UnauthorizedError)

  })

  it("deve lançar UserNotFoundError se o usuário estiver deletado", async () => {

    userQueryRepository.findByEmail = vi.fn().mockResolvedValue({
      id: "user-id",
      name: "USER NAME",
      email: "user@email.com",
      password: "hashed-password",
      passwordChangeAt: null,
      deletedAt: new Date()
    })

    await expect(
      sut.execute("user@email.com", "password")
    ).rejects.toBeInstanceOf(UserNotFoundError)

  })

  it("deve lançar InvalidCredentialsError se a senha for inválida", async () => {

    userQueryRepository.findByEmail = vi.fn().mockResolvedValue(
      makePersistedUser()
    )

    vi.spyOn(bcrypt, "compare").mockResolvedValue(false as never)

    await expect(
      sut.execute("user@email.com", "wrong-password")
    ).rejects.toBeInstanceOf(InvalidCredentialsError)

  })

})