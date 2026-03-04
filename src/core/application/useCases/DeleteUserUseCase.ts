import type { IRefreshTokenRepository } from "../../../interfaces/repositories/RefreshTokenRepository"
import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository"
import { User } from "../../domain/entities/User.entity"
import { UserNotFoundError } from "../../domain/erros/UserNotFoundError"
import { UserMapper } from "../mappers/UserMapper"

export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userQueryRepository :IUserQueryRepository,
    private readonly refresTokenRepository :IRefreshTokenRepository
  ) {}

  async execute(userId: string): Promise<void> {
    const userPersistido = await this.userQueryRepository.findById(userId)

    if (!userPersistido || userPersistido.deletedAt) {
      throw new UserNotFoundError()
    }

    const user = UserMapper.toDomain(userPersistido)

    user.softDelete()

    await this.userRepository.softDelete(
      user.getId(),
      user.getPasswordChangeAtOrThrow(),
      user.getDeletedAtOrThrow()
    )
  }
}
