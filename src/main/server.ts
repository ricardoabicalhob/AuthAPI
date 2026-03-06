import 'dotenv/config'
import fastify from "fastify";
import cors from "@fastify/cors"
import { registerSwagger } from "../docs/swagger";
import { env } from './config/env';
import { userRoutes } from '../infrastructure/http/routes/user.routes';
import { authRoutes } from '../infrastructure/http/routes/auth.routes';
import { registerErrorHandler } from '../infrastructure/http/error-handler';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';

async function bootstrap() {
    const PORT = 3100

    const app = fastify({
        logger: true,
        trustProxy: true
    })

    await app.register(helmet, {
        global: true
    })

    await app.register(rateLimit, {
        max: 100,
        timeWindow: "1 minute"
    })

    app.register(cors, {
        origin: (origin, callback) => {
            const allowedOrigins = [
                env.FRONTEND_URL,
                'http://localhost:5173'
            ]

            if(!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
                return
            }

            callback(new Error("Not allowed by CORS"), false)
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
    })

    // app.register(cors, {
    //     origin: env.FRONTEND_URL,
    //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
    // })
    
    await registerSwagger(app)

    registerErrorHandler(app)

    app.register(userRoutes, {
        prefix: '/usuarios'
    })

    app.register(authRoutes, {
        prefix: '/auth'
    })

    app.listen({
        port: PORT,
        host: "0.0.0.0"
    }, 
    function (err, adress) {
        if(err) {
            app.log.error(err)
            process.exit(1)
        }
        console.log("🚀 Servidor rodando na porta 3100")
    })
}

bootstrap().catch(err => {
  console.error(err)
  process.exit(1)
})