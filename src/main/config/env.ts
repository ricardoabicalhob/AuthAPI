import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum([ 'development', 'test', 'production' ]).default('development'),

    PORT: z.coerce.number().default(3100),

    FRONTEND_URL: z.string().min(1),

    DATABASE_URL: z.string().startsWith('postgresql://', 'DATABASE_URL deve iniciar com postgresql://')
})

const _env = envSchema.safeParse(process.env)

if(!_env.success) {
    console.error('❌ Variáveis de ambiente inválidas:', _env.error.format())
    throw new Error('Configuração de ambiente inválida')
}

export const env = _env.data