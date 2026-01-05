import type { FastifyInstance } from "fastify"
import { makeAuthController } from "../factories/MakeAuthController"
import { makeRefreshTokenController } from "../factories/MakeRefreshTokenController"

export async function authRoutes(app: FastifyInstance) {
  const authController = makeAuthController()
  const refreshTokenController = makeRefreshTokenController()

  app.post("/login", authController.login.bind(authController))

  app.post("/refresh", refreshTokenController.handle.bind(refreshTokenController))
}