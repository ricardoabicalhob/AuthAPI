import { type FastifySchema } from "fastify"

export const userPasswordResetSchema: FastifySchema = {
  summary: "Resetar senha",
  description:
    "Redefine a senha do usuário utilizando um token de recuperação válido. " +
    "O token deve ter sido previamente enviado por email e não pode estar expirado.",
  tags: ["Usuários"],
  
  body: {
    type: "object",
    required: ["token", "password"],
    properties: {
      token: {
        type: "string",
        description: "Token de recuperação recebido por email"
      },
      password: {
        type: "string",
        minLength: 8,
        description: "Nova senha do usuário"
      }
    }
  },

  response: {
    204: {
      description:
        "Senha redefinida com sucesso. " +
        "Todos os access tokens e refresh tokens emitidos anteriormente são automaticamente invalidados."
    },

    400: {
      description: "Token inválido ou expirado",
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
