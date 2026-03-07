export class PasswordMinimumCharacterLimitError extends Error {
  public readonly statusCode = 409

  constructor() {
    super("A senha precisa possuir um mínimo de 8 caracteres")
    this.name = "PasswordMinimumCharacterLimitError"
  }
}