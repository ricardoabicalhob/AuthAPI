"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const swagger_1 = require("../docs/swagger");
const env_1 = require("./config/env");
const user_routes_1 = require("../infrastructure/http/routes/user.routes");
const auth_routes_1 = require("../infrastructure/http/routes/auth.routes");
const error_handler_1 = require("../infrastructure/http/error-handler");
const helmet_1 = __importDefault(require("@fastify/helmet"));
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
async function bootstrap() {
    const PORT = 3100;
    const app = (0, fastify_1.default)({
        logger: true,
        trustProxy: true
    });
    await app.register(helmet_1.default, {
        global: true
    });
    await app.register(rate_limit_1.default, {
        max: 100,
        timeWindow: "1 minute"
    });
    app.register(cors_1.default, {
        origin: (origin, callback) => {
            const allowedOrigins = [
                env_1.env.FRONTEND_URL,
                'http://localhost:5173'
            ];
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
                return;
            }
            callback(new Error("Not allowed by CORS"), false);
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
    });
    // app.register(cors, {
    //     origin: env.FRONTEND_URL,
    //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
    // })
    await (0, swagger_1.registerSwagger)(app);
    (0, error_handler_1.registerErrorHandler)(app);
    app.register(user_routes_1.userRoutes, {
        prefix: '/usuarios'
    });
    app.register(auth_routes_1.authRoutes, {
        prefix: '/auth'
    });
    app.listen({
        port: PORT,
        host: "0.0.0.0"
    }, function (err, adress) {
        if (err) {
            app.log.error(err);
            process.exit(1);
        }
        console.log("🚀 Servidor rodando na porta 3100");
    });
}
bootstrap().catch(err => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map