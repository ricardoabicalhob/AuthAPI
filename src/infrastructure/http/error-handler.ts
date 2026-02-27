import type { FastifyInstance } from "fastify"
import type { AppError } from "../../core/domain/erros/AppError"

function isAppError(error: unknown): error is AppError {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    typeof (error as any).statusCode === "number"
  )
}

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, _request, reply) => {
    if (isAppError(error)) {
      return reply.status(error.statusCode).send({
        message: error.message
      })
    }

    console.error(error)

    return reply.status(500).send({
      message: "Erro interno do servidor"
    })
  })
}
