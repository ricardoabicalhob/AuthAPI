import { RefreshTokenController } from "../controllers/RefreshTokenController"
import { RefreshTokenUseCase } from "../../../core/application/useCases/RefreshTokenUseCase"
import { UserPrismaQueryRepository } from "../../database/UserPrismaRepository"
import { TokenService } from "../../../core/domain/services/TokenService"
import { RefreshTokenPrismaQueryRepository, RefreshTokenPrismaRepository } from "../../database/RefreshTokenPrismaRepository"

export function makeRefreshTokenController() {
  const userQueryRepository = new UserPrismaQueryRepository()
  const refreshTokenRepository = new RefreshTokenPrismaRepository()
  const refreshTokenQueryRepository = new RefreshTokenPrismaQueryRepository()
  const tokenService = new TokenService()

  const refreshTokenUseCase = new RefreshTokenUseCase(
    userQueryRepository,
    refreshTokenRepository,
    refreshTokenQueryRepository,
    tokenService
  )

  return new RefreshTokenController(refreshTokenUseCase)
}