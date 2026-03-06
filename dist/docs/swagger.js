"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSwagger = registerSwagger;
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
async function registerSwagger(app) {
    await app.register(swagger_1.default, {
        openapi: {
            info: {
                title: "Auth API",
                description: "API responsável por cadastro, autenticação e emissão de tokens JWT.",
                version: "1.0.0",
            },
            tags: [
                { name: "Usuários", description: "Criação de usuário, alteração e recuperação de senha." },
                { name: "Autenticação", description: "Login, logout, refresh token e chave pública para validação de token" }
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT"
                    }
                }
            },
        },
        hideUntagged: true,
    });
    await app.register(swagger_ui_1.default, {
        routePrefix: "/docs",
        uiConfig: {
            docExpansion: "list",
            deepLinking: false,
        },
    });
}
//# sourceMappingURL=swagger.js.map