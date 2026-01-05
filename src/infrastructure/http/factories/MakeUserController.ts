import { HashService } from "../../../core/services/HashService"
import { MailService } from "../../../core/services/MailService"
import { TokenHashService } from "../../../core/services/TokenHashService"
import { TokenService } from "../../../core/services/TokenService"
import { ChangePasswordUseCase } from "../../../core/useCases/ChangePasswordUseCase"
import { CreateUserUseCase } from "../../../core/useCases/CreateUserUseCase"
import { DeleteUserUseCase } from "../../../core/useCases/DeleteUserUseCase"
import { RequestPasswordResetUseCase } from "../../../core/useCases/RequestPasswordResetUseCase"
import { ResetPasswordUseCase } from "../../../core/useCases/ResetPasswordUseCase"
import { UserPrismaQueryRepository, UserPrismaRepository } from "../../database/UserPrismaRepository"
import { UserController } from "../controllers/UserController"

export function makeUserController() {
  const userRepository = new UserPrismaRepository()
  const userQueryRepository = new UserPrismaQueryRepository()

  const hashService = new HashService()
  const tokenHashService = new TokenHashService()
  const mailService = new MailService()
  const tokenService = new TokenService()

  const createUserUseCase = new CreateUserUseCase(
    userRepository,
    userQueryRepository,
    hashService
  )

  const requestPasswordResetUseCase = new RequestPasswordResetUseCase(
    userRepository,
    userQueryRepository,
    tokenService,
    mailService
  )

  const resetPasswordUseCase = new ResetPasswordUseCase(
    userRepository,
    userQueryRepository,
    hashService,
    tokenHashService
  )

  const changePasswordUseCase = new ChangePasswordUseCase(
    userRepository,
    userQueryRepository,
    hashService
  )

  const deleteUserUseCase = new DeleteUserUseCase(
    userRepository,
    userQueryRepository
  )

  return new UserController(
    createUserUseCase,
    requestPasswordResetUseCase,
    resetPasswordUseCase,
    changePasswordUseCase,
    deleteUserUseCase
  )
}
