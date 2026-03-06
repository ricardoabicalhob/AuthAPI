"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerErrorHandler = registerErrorHandler;
function isAppError(error) {
    return (typeof error === "object" &&
        error !== null &&
        "statusCode" in error &&
        typeof error.statusCode === "number");
}
function registerErrorHandler(app) {
    app.setErrorHandler((error, _request, reply) => {
        if (isAppError(error)) {
            return reply.status(error.statusCode).send({
                message: error.message
            });
        }
        console.error(error);
        return reply.status(500).send({
            message: "Erro interno do servidor"
        });
    });
}
//# sourceMappingURL=error-handler.js.map