import type { FastifyInstance } from "fastify"
import { makeUserController } from "../factories/MakeUserController"
import { authMiddleware } from "../middlewares/AuthMiddleware"
import { userCreateSchema } from "../schemas/user-create.schema"
import { userPasswordForgotSchema } from "../schemas/user-password-forgot.schema"
import { userPasswordResetSchema } from "../schemas/user-password-reset.schema"
import { userPasswordChangeSchema } from "../schemas/user-password-change.schema"
import { userDeleteSchema } from "../schemas/user-delete.schema"


export async function userRoutes(app: FastifyInstance) {
  const userController = makeUserController()

  app.post(
    "/", 
    { schema: userCreateSchema }, 
    userController.create.bind(userController))

  app.post(
    "/password/forgot",
    { schema: userPasswordForgotSchema },
    userController.requestPasswordReset.bind(userController)
  )

  app.post(
    "/password/reset",
    { schema: userPasswordResetSchema },
    userController.resetPassword.bind(userController)
  )

  app.post(
    "/password/change",
    { schema: userPasswordChangeSchema, preHandler: authMiddleware },
    userController.changePassword.bind(userController)
  )

  app.delete(
    "/me",
    { schema: userDeleteSchema , preHandler: authMiddleware },
    userController.deleteUser.bind(userController)
  )
}
