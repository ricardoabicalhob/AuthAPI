import { type FastifySchema } from "fastify"

export const userPasswordChangeSchema: FastifySchema = {
  summary: "Alterar senha",
  description:
    "Altera a senha do usuário autenticado. " +
    "Requer um access token JWT válido no header Authorization.",
  tags: ["Usuários"],

  security: [
    {
      bearerAuth: []
    }
  ],

  body: {
    type: "object",
    required: ["currentPassword", "newPassword"],
    properties: {
      currentPassword: {
        type: "string",
        description: "Senha atual do usuário"
      },
      newPassword: {
        type: "string",
        minLength: 8,
        description: "Nova senha do usuário"
      }
    }
  },

  response: {
    204: {
      description:
        "Senha alterada com sucesso. " +
        "Todos os access tokens e refresh tokens emitidos anteriormente são automaticamente invalidados."
    },

    401: {
      description: "Token inválido ou expirado",
      type: "object",
      properties: {
        message: {
          type: "string"
        }
      }
    },

    403: {
      description: "Senha atual incorreta",
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
}
