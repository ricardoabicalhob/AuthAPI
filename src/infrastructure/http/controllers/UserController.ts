// infra/http/controllers/UserController.ts

import type { FastifyReply, FastifyRequest } from "fastify"
import type { CreateUserUseCase } from "../../../core/useCases/CreateUserUseCase"
import type { RequestPasswordResetUseCase } from "../../../core/useCases/RequestPasswordResetUseCase"
import type { ResetPasswordUseCase } from "../../../core/useCases/ResetPasswordUseCase"
import type { ChangePasswordUseCase } from "../../../core/useCases/ChangePasswordUseCase"
import type { DeleteUserUseCase } from "../../../core/useCases/DeleteUserUseCase"

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly requestPasswordResetUseCase: RequestPasswordResetUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly changePasswordUseCase :ChangePasswordUseCase,
    private readonly deleteUserUseCase :DeleteUserUseCase
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as {
      email: string
      password: string
    }

    const user = await this.createUserUseCase.execute({
      email,
      password
    })

    return reply.status(201).send(user)
  }

  async deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id

    await this.deleteUserUseCase.execute(userId)

    return reply.status(204).send()
  }

  async changePassword(request :FastifyRequest, reply :FastifyReply) {
    const { currentPassword, newPassword } = request.body as {
      currentPassword :string,
      newPassword :string
    }

    const userId = request.user.id

    await this.changePasswordUseCase.execute(
      userId,
      currentPassword,
      newPassword
    )

    return reply.status(204).send()
  }

  async requestPasswordReset(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { email } = request.body as { email: string }

    await this.requestPasswordResetUseCase.execute(email)

    return reply.status(204).send()
  }

  async resetPassword(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const { token, password } = request.body as {
      token: string
      password: string
    }

    await this.resetPasswordUseCase.execute(token, password)

    return reply.status(204).send()
  }
}
