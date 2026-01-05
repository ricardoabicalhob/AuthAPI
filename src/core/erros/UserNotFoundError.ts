export class UserNotFoundError extends Error {
  public readonly statusCode = 401

  constructor() {
    super("Usuário não encontrado")
    this.name = "UserNotFoundError"
  }
}