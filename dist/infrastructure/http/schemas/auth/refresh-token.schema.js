"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = void 0;
exports.refreshTokenSchema = {
    summary: "Gerar novo access token",
    description: "Recebe um refreshToken válido e retorna um novo accessToken e um novo refreshToken.",
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
        200: {
            description: "Novo access token gerado",
            type: "object",
            properties: {
                accessToken: {
                    type: "string"
                },
                refreshToken: {
                    type: "string"
                }
            }
        },
        401: {
            description: "Refresh token inválido ou expirado",
            type: "object",
            properties: {
                message: {
                    type: "string",
                    example: "Unauthorized"
                }
            }
        }
    }
};
//# sourceMappingURL=refresh-token.schema.js.map