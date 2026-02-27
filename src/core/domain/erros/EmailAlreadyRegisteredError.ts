export class EmailAlreadyRegisteredError extends Error {
  public readonly statusCode = 409

  constructor() {
    super("E-mail já cadastrado")
    this.name = "EmailAlreadyRegisteredError"
  }
}