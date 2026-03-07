export class NameMinimumCharacterLimitError extends Error {
  public readonly statusCode = 409

  constructor() {
    super("O nome deve possuir no mínimo 3 caracteres")
    this.name = "NameMinimumCharacterLimitError"
  }
}