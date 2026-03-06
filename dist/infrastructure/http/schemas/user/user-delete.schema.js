"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDeleteSchema = void 0;
exports.userDeleteSchema = {
    summary: "Excluir usuário",
    description: "Realiza a exclusão lógica do usuário autenticado. " +
        "Após a exclusão, o usuário não poderá mais autenticar e todos os tokens previamente emitidos tornam-se inválidos. " +
        "Requer um access token JWT válido no header Authorization.",
    tags: ["Usuários"],
    security: [
        {
            bearerAuth: []
        }
    ],
    response: {
        204: {
            description: "Usuário excluído com sucesso"
        },
        401: {
            description: "Não autorizado",
            type: "object",
            properties: {
                message: {
                    type: "string"
                }
            }
        },
        500: {
            description: "Erro interno do servidor",
            type: "object",
            properties: {
                message: {
                    type: "string"
                }
            }
        }
    }
};
//# sourceMappingURL=user-delete.schema.js.map