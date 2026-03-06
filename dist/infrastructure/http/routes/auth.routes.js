"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = authRoutes;
const MakeAuthController_1 = require("../factories/MakeAuthController");
const MakeRefreshTokenController_1 = require("../factories/MakeRefreshTokenController");
const MakeGetJwksController_1 = require("../factories/MakeGetJwksController");
const login_schema_1 = require("../schemas/auth/login.schema");
const refresh_token_schema_1 = require("../schemas/auth/refresh-token.schema");
const logout_schema_1 = require("../schemas/auth/logout.schema");
const jwks_schema_1 = require("../schemas/auth/jwks.schema");
async function authRoutes(app) {
    const authController = (0, MakeAuthController_1.makeAuthController)();
    const getJwksController = (0, MakeGetJwksController_1.makeGetJwksController)();
    const refreshTokenController = (0, MakeRefreshTokenController_1.makeRefreshTokenController)();
    app.post("/login", {
        schema: login_schema_1.loginSchema,
        config: {
            rateLimit: {
                max: 5,
                timeWindow: "1 minute"
            }
        }
    }, authController.login.bind(authController));
    app.post("/logout", {
        schema: logout_schema_1.logoutSchema,
        config: {
            rateLimit: {
                max: 20,
                timeWindow: "1 minute"
            }
        }
    }, authController.logout.bind(authController));
    app.post("/refresh", {
        schema: refresh_token_schema_1.refreshTokenSchema,
        config: {
            rateLimit: {
                max: 20,
                timeWindow: "1 minute",
            }
        }
    }, refreshTokenController.handle.bind(refreshTokenController));
    app.get('/.well-known/jwks.json', { schema: jwks_schema_1.jwksSchema }, getJwksController.handle.bind(getJwksController));
}
//# sourceMappingURL=auth.routes.js.map