import { type FastifySchema } from "fastify"

export const refreshTokenSchema: FastifySchema = {
  summary: "Gerar novo access token",
  description: "Recebe um refreshToken válido e retorna um novo accessToken.",
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
}