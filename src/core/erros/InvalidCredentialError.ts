export class InvalidCredentialsError extends Error {
  public readonly statusCode = 401

  constructor() {
    super("Credenciais inválidas")
    this.name = "InvalidCredentialsError"
  }
}