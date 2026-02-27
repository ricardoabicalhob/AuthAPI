import { type FastifySchema } from "fastify"

export const userPasswordForgotSchema: FastifySchema = {
  summary: "Solicitar recuperação de senha",
  description:
    "Solicita o envio de um email com instruções para recuperação de senha. " +
    "Por motivos de segurança, a resposta é a mesma independentemente do email existir ou não.",
  tags: ["Usuários"],

  body: {
    type: "object",
    required: ["email"],
    properties: {
      email: {
        type: "string",
        format: "email"
      }
    }
  },

  response: {
    204: {
      description:
        "Solicitação processada com sucesso.\n\n" +
        "Exemplo de email enviado:\n" +
        "E-mail enviado para user@email.com: " +
        "https://app.exemplo.com/reset-password?token=cdcb633f0418c67a08ed08421ba5cdf19d6c5ba0b08205e4651e794d8445a082"
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
