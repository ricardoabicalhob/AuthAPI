export class UserNotFoundError extends Error {
  public readonly statusCode = 404

  constructor() {
    super("Usuário não encontrado")
    this.name = "UserNotFoundError"
  }
}