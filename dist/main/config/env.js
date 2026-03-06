"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('development'),
    PORT: zod_1.z.coerce.number().default(3100),
    FRONTEND_URL: zod_1.z.string().min(1),
    DATABASE_URL: zod_1.z.string().startsWith('postgresql://', 'DATABASE_URL deve iniciar com postgresql://')
});
const _env = envSchema.safeParse(process.env);
if (!_env.success) {
    console.error('❌ Variáveis de ambiente inválidas:', _env.error.format());
    throw new Error('Configuração de ambiente inválida');
}
exports.env = _env.data;
//# sourceMappingURL=env.js.map