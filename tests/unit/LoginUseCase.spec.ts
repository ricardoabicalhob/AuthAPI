// import { describe, it, expect, beforeEach, vi } from "vitest"
// import bcrypt from "bcrypt"

// import { LoginUseCase } from "../../src/core/application/useCases/LoginUseCase"
// import type { IUserQueryRepository } from "../../src/interfaces/repositories/UserRepository"
// import type { TokenService } from "../../src/core/domain/services/TokenService"

// import { InvalidCredentialsError } from "../../src/core/domain/erros/InvalidCredentialError"
// import { UserNotFoundError } from "../../src/core/domain/erros/UserNotFoundError"

// import { makeUserQueryRepositoryMock } from "../factories/user/MakeUserRepositories"
// import type { IRefreshTokenRepository } from "../../src/interfaces/repositories/RefreshTokenRepository"
// import { makeRefreshTokenRepositoryMock } from "../factories/user/MakeRefreshTokenRepository"

// describe("LoginUseCase", () => {
//   let userQueryRepository: IUserQueryRepository
//   let refreshTokenRepository: IRefreshTokenRepository
//   let tokenService: TokenService
//   let sut: LoginUseCase

//   beforeEach(() => {
//     userQueryRepository = makeUserQueryRepositoryMock()
//     refreshTokenRepository = makeRefreshTokenRepositoryMock()

//     tokenService = {
//       generateAccessToken: vi.fn(),
//       generateRefreshToken: vi.fn()
//     } as unknown as TokenService

//     sut = new LoginUseCase(
//       userQueryRepository,
//       refreshTokenRepository,
//       tokenService
//     )

//     vi.restoreAllMocks()
//   })

//   it("deve retornar accessToken e refreshToken quando credenciais forem válidas", async () => {
//     userQueryRepository.findByEmail = vi.fn().mockResolvedValue({
//       id: "user-id",
//       email: "user@email.com",
//       passwordChangeAt: null,
//       deletedAt: null
//     })

//     userQueryRepository.findUserWithPasswordByEmail = vi.fn().mockResolvedValue({
//       id: "user-id",
//       email: "user@email.com",
//       password: "hashed-password"
//     })

//     vi.spyOn(bcrypt, "compare").mockImplementation(async () => true)

//     ;(tokenService.generateAccessToken as any).mockReturnValue("access-token")
//     ;(tokenService.generateRefreshToken as any).mockReturnValue("refresh-token")

//     const result = await sut.execute(
//       "user@email.com",
//       "plain-password"
//     )

//     expect(bcrypt.compare).toHaveBeenCalledWith(
//       "plain-password",
//       "hashed-password"
//     )

//     expect(tokenService.generateAccessToken).toHaveBeenCalledWith("user-id")
//     expect(tokenService.generateRefreshToken).toHaveBeenCalledWith("user-id")

//     expect(result).toEqual({
//       accessToken: "access-token",
//       refreshToken: "refresh-token"
//     })
//   })

//   it("deve lançar InvalidCredentialsError se o email não existir", async () => {
//     userQueryRepository.findByEmail = vi.fn().mockResolvedValue(null)

//     await expect(
//       sut.execute("user@email.com", "password")
//     ).rejects.toBeInstanceOf(InvalidCredentialsError)
//   })

//   it("deve lançar UserNotFoundError se o usuário estiver deletado", async () => {
//     userQueryRepository.findByEmail = vi.fn().mockResolvedValue({
//       id: "user-id",
//       email: "user@email.com",
//       passwordChangeAt: null,
//       deletedAt: new Date()
//     })

//     await expect(
//       sut.execute("user@email.com", "password")
//     ).rejects.toBeInstanceOf(UserNotFoundError)
//   })

//   it("deve lançar InvalidCredentialsError se não encontrar usuário com senha", async () => {
//     userQueryRepository.findByEmail = vi.fn().mockResolvedValue({
//       id: "user-id",
//       email: "user@email.com",
//       passwordChangeAt: null,
//       deletedAt: null
//     })

//     userQueryRepository.findUserWithPasswordByEmail = vi.fn().mockResolvedValue(null)

//     await expect(
//       sut.execute("user@email.com", "password")
//     ).rejects.toBeInstanceOf(InvalidCredentialsError)
//   })

//   it("deve lançar InvalidCredentialsError se a senha for inválida", async () => {
//     userQueryRepository.findByEmail = vi.fn().mockResolvedValue({
//       id: "user-id",
//       email: "user@email.com",
//       passwordChangeAt: null,
//       deletedAt: null
//     })

//     userQueryRepository.findUserWithPasswordByEmail = vi.fn().mockResolvedValue({
//       id: "user-id",
//       email: "user@email.com",
//       password: "hashed-password"
//     })

//     vi.spyOn(bcrypt, "compare").mockImplementation(async () => false)

//     await expect(
//       sut.execute("user@email.com", "wrong-password")
//     ).rejects.toBeInstanceOf(InvalidCredentialsError)
//   })
// })
