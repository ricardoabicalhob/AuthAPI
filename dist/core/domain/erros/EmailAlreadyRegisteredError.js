"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAlreadyRegisteredError = void 0;
class EmailAlreadyRegisteredError extends Error {
    statusCode = 409;
    constructor() {
        super("E-mail já cadastrado");
        this.name = "EmailAlreadyRegisteredError";
    }
}
exports.EmailAlreadyRegisteredError = EmailAlreadyRegisteredError;
//# sourceMappingURL=EmailAlreadyRegisteredError.js.map