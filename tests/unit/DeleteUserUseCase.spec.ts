import { describe, it, expect, beforeEach, vi } from "vitest"

import { DeleteUserUseCase } from "../../src/core/application/useCases/DeleteUserUseCase"
import type { IUserQueryRepository, IUserRepository } from "../../src/interfaces/repositories/UserRepository"
import { UserNotFoundError } from "../../src/core/domain/erros/UserNotFoundError"
import { makeUserRepositoryMock, makeUserQueryRepositoryMock } from "../factories/user/MakeUserRepositories"
import { makePersistedUser } from "../factories/user/MakePersistedUser"

describe("DeleteUserUseCase", () => {

  let userRepository: IUserRepository
  let userQueryRepository: IUserQueryRepository
  let sut: DeleteUserUseCase

  beforeEach(() => {

    userRepository = makeUserRepositoryMock()
    userQueryRepository = makeUserQueryRepositoryMock()

    sut = new DeleteUserUseCase(
      userRepository,
      userQueryRepository
    )

    vi.restoreAllMocks()

  })

  it("deve deletar o usuário quando ele existir", async () => {

    userQueryRepository.findById = vi.fn().mockResolvedValue(
      makePersistedUser()
    )

    await sut.execute("user-id")

    expect(userRepository.softDelete).toHaveBeenCalledWith(
      "user-id",
      expect.any(Date),
      expect.any(Date)
    )

  })

  it("deve lançar UserNotFoundError se o usuário não existir", async () => {

    userQueryRepository.findById = vi.fn().mockResolvedValue(null)

    await expect(
      sut.execute("user-id")
    ).rejects.toBeInstanceOf(UserNotFoundError)

    expect(userRepository.softDelete).not.toHaveBeenCalled()

  })

  it("deve lançar UserNotFoundError se o usuário já estiver deletado", async () => {

    userQueryRepository.findById = vi.fn().mockResolvedValue({
      id: "user-id",
      email: "user@email.com",
      name: "USER NAME",
      password: "hashed-password",
      deletedAt: new Date(),
      passwordChangeAt: null
    })

    await expect(
      sut.execute("user-id")
    ).rejects.toBeInstanceOf(UserNotFoundError)

    expect(userRepository.softDelete).not.toHaveBeenCalled()

  })

})