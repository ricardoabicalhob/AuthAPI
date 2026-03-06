"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsError = void 0;
class InvalidCredentialsError extends Error {
    statusCode = 401;
    constructor() {
        super("Credenciais inválidas");
        this.name = "InvalidCredentialsError";
    }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
//# sourceMappingURL=InvalidCredentialError.js.map