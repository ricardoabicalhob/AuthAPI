export class PasswordMinimumNumberLimitError extends Error {
  public readonly statusCode = 409

  constructor() {
    super("A senha deve possuir pelo menos um número")
    this.name = "PasswordMinimumNumberLimitError"
  }
}