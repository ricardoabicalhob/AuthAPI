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

      /**
       * 🔐 Aplica autenticação por padrão em TODAS as rotas
       */
      // security: [
      //   {
      //     bearerAuth: []
      //   }
      // ]
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
