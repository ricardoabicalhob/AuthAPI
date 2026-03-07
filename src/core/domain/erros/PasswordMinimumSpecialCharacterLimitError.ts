export class PasswordMinimumSpecialCharacterLimitError extends Error {
  public readonly statusCode = 409

  constructor() {
    super("A senha deve possuir pelo menos um caractere especial")
    this.name = "PasswordMinimumSpecialCharacterLimitError"
  }
}