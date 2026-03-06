"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreateSchema = void 0;
exports.userCreateSchema = {
    summary: "Criar usuário",
    description: "Cria um novo usuário com email e senha.",
    tags: ["Usuários"],
    body: {
        type: "object",
        required: ["email", "name", "password"],
        properties: {
            email: {
                type: "string",
                format: "email",
            },
            name: {
                type: "string"
            },
            password: {
                type: "string",
                minLength: 8,
            }
        }
    },
    response: {
        201: {
            description: "Usuário criado com sucesso",
            type: "object",
            properties: {
                id: {
                    type: "string",
                    format: "uuid",
                    example: "9f1c2b6e-8c7a-4f9d-b0d1-1c5c7e9f1234"
                },
                email: {
                    type: "string",
                    format: "email",
                    example: "user@email.com"
                },
                name: {
                    type: "string",
                    example: "Nome do usuário"
                }
            }
        },
        409: {
            description: "E-mail já cadastrado",
            type: "object",
            properties: {
                message: {
                    type: "string",
                    example: "E-mail já cadastrado"
                }
            }
        },
        500: {
            description: "Erro interno do servidor",
            type: "object",
            properties: {
                message: {
                    type: "string",
                    example: "Internal server error"
                }
            }
        }
    }
};
//# sourceMappingURL=user-create.schema.js.map