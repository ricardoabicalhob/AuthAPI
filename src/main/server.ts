import 'dotenv/config'
import fastify from "fastify";
import cors from "@fastify/cors"
import { registerSwagger } from "../docs/swagger";
import { env } from './config/env';
import { userRoutes } from '../infrastructure/http/routes/user.routes';
import { authRoutes } from '../infrastructure/http/routes/auth.routes';
import { registerErrorHandler } from '../infrastructure/http/error-handler';

async function bootstrap() {
    const PORT = 3100

    const app = fastify({
        logger: true
    })

    app.register(cors, {
        origin: env.FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
    })
    
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