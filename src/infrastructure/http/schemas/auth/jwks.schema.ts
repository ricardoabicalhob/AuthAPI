import { type FastifySchema } from "fastify"

export const jwksSchema: FastifySchema = {
  summary: "Obter chaves públicas (JWKS)",
  description: "Endpoint utilizado para disponibilizar as chaves públicas usadas na validação dos JWTs emitidos pela API.",
  tags: ["Autenticação"],

  response: {
    200: {
      description: "Lista de chaves públicas disponíveis",
      type: "object",
      properties: {
        keys: {
          type: "array",
          items: {
            type: "object",
            properties: {
              kty: {
                type: "string",
                example: "RSA"
              },
              n: {
                type: "string",
                description: "Modulus da chave pública"
              },
              e: {
                type: "string",
                description: "Expoente da chave pública",
                example: "AQAB"
              },
              kid: {
                type: "string",
                example: "auth-key-1"
              },
              alg: {
                type: "string",
                example: "RS256"
              },
              use: {
                type: "string",
                example: "sig"
              }
            }
          }
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
}