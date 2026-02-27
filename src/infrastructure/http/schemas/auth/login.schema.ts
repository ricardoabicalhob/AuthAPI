import { type FastifySchema } from "fastify"

export const loginSchema: FastifySchema = {
  summary: "Login",
  description: "Autentica um usuário e retorna accessToken e refreshToken.",
  tags: ["Autenticação"],

  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email"
      },
      password: {
        type: "string"
      }
    }
  },

  response: {
    200: {
      description: "Login realizado com sucesso",
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
      description: "Credenciais inválidas",
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Invalid credentials"
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