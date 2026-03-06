"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = userRoutes;
const MakeUserController_1 = require("../factories/MakeUserController");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const user_create_schema_1 = require("../schemas/user/user-create.schema");
const user_password_forgot_schema_1 = require("../schemas/user/user-password-forgot.schema");
const user_password_reset_schema_1 = require("../schemas/user/user-password-reset.schema");
const user_password_change_schema_1 = require("../schemas/user/user-password-change.schema");
const user_delete_schema_1 = require("../schemas/user/user-delete.schema");
async function userRoutes(app) {
    const userController = (0, MakeUserController_1.makeUserController)();
    app.post("/", { schema: user_create_schema_1.userCreateSchema }, userController.create.bind(userController));
    app.post("/password/forgot", {
        schema: user_password_forgot_schema_1.userPasswordForgotSchema,
        config: {
            rateLimit: {
                max: 3,
                timeWindow: "5 minutes"
            }
        }
    }, userController.requestPasswordReset.bind(userController));
    app.post("/password/reset", {
        schema: user_password_reset_schema_1.userPasswordResetSchema,
        config: {
            rateLimit: {
                max: 5,
                timeWindow: "5 minutes"
            }
        }
    }, userController.resetPassword.bind(userController));
    app.post("/password/change", { schema: user_password_change_schema_1.userPasswordChangeSchema, preHandler: AuthMiddleware_1.authMiddleware }, userController.changePassword.bind(userController));
    app.delete("/me", { schema: user_delete_schema_1.userDeleteSchema, preHandler: AuthMiddleware_1.authMiddleware }, userController.deleteUser.bind(userController));
}
//# sourceMappingURL=user.routes.js.map