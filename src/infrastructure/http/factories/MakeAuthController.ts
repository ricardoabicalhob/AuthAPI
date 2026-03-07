import { AuthController } from "../controllers/AuthController"
import { LoginUseCase } from "../../../core/application/useCases/LoginUseCase"
import { UserPrismaQueryRepository } from "../../database/UserPrismaRepository"
import { TokenService } from "../../../core/domain/services/TokenService"
import { RefreshTokenPrismaQueryRepository, RefreshTokenPrismaRepository } from "../../database/RefreshTokenPrismaRepository"
import { LogoutUseCase } from "../../../core/application/useCases/LogoutUseCase"
import { PasswordHasher } from "../../../core/domain/services/PasswordHasher"
import { TokenHashService } from "../../../core/domain/services/TokenHashService"

export function makeAuthController() {
  const userQueryRepository = new UserPrismaQueryRepository()
  const refreshTokenRepository = new RefreshTokenPrismaRepository()
  const refreshTokenQueryRepository = new RefreshTokenPrismaQueryRepository()
  const tokenService = new TokenService()
  const tokenHashService = new TokenHashService()

  const loginUseCase = new LoginUseCase(
    userQueryRepository,
    refreshTokenRepository,
    tokenService
  )

  const logoutUseCase = new LogoutUseCase(
    refreshTokenQueryRepository,
    refreshTokenRepository,
    tokenHashService
  )

  return new AuthController({
    loginUseCase,
    logoutUseCase
  })
}