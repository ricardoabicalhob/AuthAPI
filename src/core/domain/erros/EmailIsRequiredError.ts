export class EmailIsRequiredError extends Error {
  public readonly statusCode = 400

  constructor() {
    super("E-mail é requerido")
    this.name = "EmailIsRequiredError"
  }
}