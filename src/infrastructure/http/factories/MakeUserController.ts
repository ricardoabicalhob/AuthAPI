import { PasswordHasher } from "../../../core/domain/services/PasswordHasher"
import { MailService } from "../../../core/domain/services/MailService"
import { TokenHashService } from "../../../core/domain/services/TokenHashService"
import { TokenService } from "../../../core/domain/services/TokenService"
import { ChangePasswordUseCase } from "../../../core/application/useCases/ChangePasswordUseCase"
import { CreateUserUseCase } from "../../../core/application/useCases/CreateUserUseCase"
import { DeleteUserUseCase } from "../../../core/application/useCases/DeleteUserUseCase"
import { RequestPasswordResetUseCase } from "../../../core/application/useCases/RequestPasswordResetUseCase"
import { ResetPasswordUseCase } from "../../../core/application/useCases/ResetPasswordUseCase"
import { UserPrismaQueryRepository, UserPrismaRepository } from "../../database/UserPrismaRepository"
import { UserController } from "../controllers/UserController"

export function makeUserController() {
  const userRepository = new UserPrismaRepository()
  const userQueryRepository = new UserPrismaQueryRepository()

  const hashService = new PasswordHasher()
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
    userQueryRepository,
  )

  return new UserController(
    createUserUseCase,
    requestPasswordResetUseCase,
    resetPasswordUseCase,
    changePasswordUseCase,
    deleteUserUseCase
  )
}
