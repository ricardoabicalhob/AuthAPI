import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository"
import { User } from "../../domain/entities/User.entity"
import { UserNotFoundError } from "../../domain/erros/UserNotFoundError"

export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userQueryRepository :IUserQueryRepository
  ) {}

  async execute(userId: string): Promise<void> {
    const userPersistido = await this.userQueryRepository.findById(userId)

    if (!userPersistido || userPersistido.deletedAt) {
      throw new UserNotFoundError()
    }

    const user = User.restore(
      {
        email: userPersistido.email,
        password: userPersistido.password,
        passwordChangeAt: userPersistido.passwordChangeAt,
        passwordResetToken: userPersistido.passwordResetToken,
        passwordResetExpiresAt: userPersistido.passwordResetExpiresAt,
        deletedAt: userPersistido.deletedAt
      },
      userPersistido.id
    )

    user.softDelete()

    await this.userRepository.softDelete(
      user.getId(),
      user.getPasswordChangeAtOrThrow(),
      user.getDeletedAtOrThrow()
    )
  }
}
