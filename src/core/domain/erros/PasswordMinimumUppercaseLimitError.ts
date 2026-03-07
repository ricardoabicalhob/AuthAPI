export class PasswordMinimumUppercaseLimitError extends Error {
  public readonly statusCode = 409

  constructor() {
    super("A senha deve possuir pelo menos uma letra maiúscula")
    this.name = "PasswordMinimumUppercaseLimitError"
  }
}