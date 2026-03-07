export class PasswordIsRequiredError extends Error {
  public readonly statusCode = 400

  constructor() {
    super("Password é requerido")
    this.name = "PasswordIsRequiredError"
  }
}