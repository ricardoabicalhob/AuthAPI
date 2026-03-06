"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutSchema = void 0;
exports.logoutSchema = {
    summary: "Logout",
    description: "Revoga o refresh token do usuário.",
    tags: ["Autenticação"],
    body: {
        type: "object",
        required: ["refreshToken"],
        properties: {
            refreshToken: {
                type: "string"
            }
        }
    },
    response: {
        204: {
            description: "Logout realizado com sucesso"
        },
        500: {
            description: "Erro interno",
            type: "object",
            properties: {
                message: {
                    type: "string"
                }
            }
        }
    }
};
//# sourceMappingURL=logout.schema.js.map