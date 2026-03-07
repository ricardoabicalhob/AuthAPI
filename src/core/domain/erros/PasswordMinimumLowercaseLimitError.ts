export class PasswordMinimumLowercaseLimitError extends Error {
  public readonly statusCode = 409

  constructor() {
    super("A senha deve possuir pelo menos uma letra minúscula")
    this.name = "PasswordMinimumLowercaseLimitError"
  }
}