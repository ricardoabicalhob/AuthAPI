import type { FastifyInstance } from "fastify"
import { makeAuthController } from "../factories/MakeAuthController"
import { makeRefreshTokenController } from "../factories/MakeRefreshTokenController"
import { makeGetJwksController } from "../factories/MakeGetJwksController"

export async function authRoutes(app: FastifyInstance) {
  const authController = makeAuthController()
  const getJwksController = makeGetJwksController()
  const refreshTokenController = makeRefreshTokenController()

  app.post("/login", authController.login.bind(authController))
  app.post("/logout", authController.logout.bind(authController))
  app.post("/refresh", refreshTokenController.handle.bind(refreshTokenController))
  app.get('/.well-known/jwks.json', getJwksController.handle.bind(getJwksController))
}