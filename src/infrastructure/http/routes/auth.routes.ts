import type { FastifyInstance } from "fastify"
import { makeAuthController } from "../factories/MakeAuthController"
import { makeRefreshTokenController } from "../factories/MakeRefreshTokenController"
import { makeGetJwksController } from "../factories/MakeGetJwksController"
import { loginSchema } from "../schemas/auth/login.schema"
import { refreshTokenSchema } from "../schemas/auth/refresh-token.schema"
import { logoutSchema } from "../schemas/auth/logout.schema"
import { jwksSchema } from "../schemas/auth/jwks.schema"

export async function authRoutes(app: FastifyInstance) {
  const authController = makeAuthController()
  const getJwksController = makeGetJwksController()
  const refreshTokenController = makeRefreshTokenController()

  app.post("/login", { 
    schema: loginSchema, 
    config: { 
      rateLimit: { 
        max: 5, 
        timeWindow: "1 minute"
      } 
    } 
  }, authController.login.bind(authController))
  
  app.post("/logout", { 
    schema: logoutSchema, 
    config: {
      rateLimit: {
        max: 20,
        timeWindow: "1 minute"
      }
    }
  }, authController.logout.bind(authController))

  app.post("/refresh", { 
    schema: refreshTokenSchema, 
    config: {
      rateLimit: {
        max: 20,
        timeWindow: "1 minute",
      }
    }
  }, refreshTokenController.handle.bind(refreshTokenController))

  app.get('/.well-known/jwks.json', { schema: jwksSchema }, getJwksController.handle.bind(getJwksController))
}