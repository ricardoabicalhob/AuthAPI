# Auth API

API de autenticação e gerenciamento de usuários construída com **Node.js**, **Fastify**, **Prisma** e **JWT**, seguindo a **Clean Architecture**.  
Esta API é responsável por cadastro, login, alteração de senha, reset de senha e emissão de tokens para outras APIs do sistema.

---

## ⚡ Funcionalidades

- Cadastro de usuários (`POST /usuarios`)
- Login (`POST /auth/login`)
- Refresh de access token (`POST /auth/refresh`)
- Alteração de senha autenticada (`PATCH /usuarios/password/change`)
- Solicitação de reset de senha (`POST /usuarios/password/forgot`)
- Reset de senha via token (`POST /usuarios/password/reset`)
- Exclusão de usuário (`DELETE /usuarios/me`)
- Tokens JWT com invalidação automática após alteração de senha (`passwordChangeAt`)
- Soft delete de usuários
- Segurança: hash de senha com bcrypt, token de reset hashado com SHA-256
- Totalmente testada com **Vitest**
- **Documentação Swagger disponível em:** [http://localhost:3100/docs](http://localhost:3100/docs)

---

## 🛠 Tecnologias

- Node.js
- Fastify
- Prisma
- PostgreSQL
- bcrypt
- jsonwebtoken
- Vitest (testes unitários)
- Swagger (OpenAPI) para documentação
- Clean Architecture e DTOs

---

## 🔑 Rotas disponíveis

| Método | Rota | Descrição | Autenticação | Status |
|--------|------|-----------|--------------|--------|
| POST   | /usuarios | Criação de usuário | ❌ | 201 |
| POST   | /auth/login | Login de usuário | ❌ | 200 |
| POST   | /auth/refresh | Refresh de access token | ❌ | 200 |
| PATCH  | /usuarios/password/change | Alteração de senha | ✅ Access Token | 204 |
| POST   | /usuarios/password/forgot | Solicitação de reset de senha | ❌ | 204 |
| POST   | /usuarios/password/reset | Reset de senha via token | ❌ | 204 |
| DELETE | /usuarios | Exclusão de usuário (soft delete) | ✅ Access Token | 204 |

### 📄 Documentação Swagger

A API possui documentação completa em **Swagger** disponível em:

[http://localhost:3100/docs](http://localhost:3100/docs)

---

## ⚙️ Instalação e setup

```bash
# Clonar repositório
git clone <https://github.com/ricardoabicalhob/AuthAPI.git>
cd authapi

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Ajustar ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET e DATABASE_URL

# Rodar migrations do Prisma
npx prisma migrate dev

# Iniciar servidor em modo desenvolvimento
npm run dev

# Rodar todos os testes unitários
npm run test