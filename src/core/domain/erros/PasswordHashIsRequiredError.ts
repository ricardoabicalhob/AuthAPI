export class PasswordHashIsRequiredError extends Error {
  public readonly statusCode = 400

  constructor() {
    super("Password hash é requerido")
    this.name = "PasswordHashIsRequiredError"
  }
}