import { AuthController } from "../controllers/AuthController"
import { LoginUseCase } from "../../../core/useCases/LoginUseCase"
import { UserPrismaQueryRepository } from "../../database/UserPrismaRepository"
import { TokenService } from "../../../core/services/TokenService"

export function makeAuthController() {
  const userQueryRepository = new UserPrismaQueryRepository()
  const tokenService = new TokenService()

  const loginUseCase = new LoginUseCase(
    userQueryRepository,
    tokenService
  )

  return new AuthController(loginUseCase)
}