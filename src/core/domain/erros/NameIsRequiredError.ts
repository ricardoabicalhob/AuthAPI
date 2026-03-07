export class NameIsRequiredError extends Error {
  public readonly statusCode = 400

  constructor() {
    super("Nome é requerido")
    this.name = "NameIsRequiredError"
  }
}