export class UnauthorizedError extends Error {
  public readonly statusCode = 401

  constructor(message = "Não autorizado") {
    super(message)
    this.name = "UnauthorizedError"
  }
}
