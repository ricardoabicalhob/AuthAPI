import swagger from "@fastify/swagger"
import swaggerUI from "@fastify/swagger-ui"
import type { FastifyInstance } from "fastify"

export async function registerSwagger(app: FastifyInstance) {
  await app.register(swagger, {
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
  })

  await app.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
  })
}
