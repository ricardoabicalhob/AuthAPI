import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository"
import { UserNotFoundError } from "../../domain/erros/UserNotFoundError"
import { UserMapper } from "../mappers/UserMapper"

export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userQueryRepository :IUserQueryRepository,
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
