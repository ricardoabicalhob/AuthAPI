export class PasswordCharactersNotAllowedError extends Error {
  public readonly statusCode = 409

  constructor() {
    super("A senha possui caracteres não permitidos")
    this.name = "PasswordCharactersNotAllowedError"
  }
}