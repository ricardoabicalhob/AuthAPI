import { type FastifySchema } from "fastify"

export const logoutSchema: FastifySchema = {
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
}