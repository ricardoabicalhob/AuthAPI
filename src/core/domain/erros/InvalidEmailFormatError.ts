export class InvalidEmailFormatError extends Error {
  public readonly statusCode = 409

  constructor() {
    super("Formato de e-mail inválido")
    this.name = "InvalidEmailFormatError"
  }
}