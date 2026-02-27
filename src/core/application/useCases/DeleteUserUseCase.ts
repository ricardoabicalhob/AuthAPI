import type { IUserQueryRepository, IUserRepository } from "../../../interfaces/repositories/UserRepository"
import { UserNotFoundError } from "../../domain/erros/UserNotFoundError"

export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userQueryRepository :IUserQueryRepository
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userQueryRepository.findById(userId)

    if (!user || user.deletedAt) {
      throw new UserNotFoundError()
    }

    await this.userRepository.softDelete(userId)
  }
}
