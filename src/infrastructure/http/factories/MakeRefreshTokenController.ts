import { RefreshTokenController } from "../controllers/RefreshTokenController"
import { RefreshTokenUseCase } from "../../../core/useCases/RefreshTokenUseCase"
import { UserPrismaQueryRepository } from "../../database/UserPrismaRepository"
import { TokenService } from "../../../core/services/TokenService"

export function makeRefreshTokenController() {
  const userQueryRepository = new UserPrismaQueryRepository()
  const tokenService = new TokenService()

  const refreshTokenUseCase = new RefreshTokenUseCase(
    userQueryRepository,
    tokenService
  )

  return new RefreshTokenController(refreshTokenUseCase)
}