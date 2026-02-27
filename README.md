# 🔐 Auth API

![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-729B1B?style=for-the-badge&logo=vitest&logoColor=white)

API de autenticação e gerenciamento de usuários desenvolvida com foco em segurança, performance e escalabilidade. O projeto aplica os princípios da **Clean Architecture**, garantindo um código testável e de fácil manutenção.

---

## 🚀 Funcionalidades

### Gestão de Usuários
- **Cadastro:** Registro de novos usuários com validação de dados.
- **Exclusão:** Remoção de conta com suporte a *soft delete*.
- **Segurança:** Hash de senhas utilizando **bcrypt** e tokens de recuperação com **SHA-256**.

### Autenticação e Sessão
- **Login:** Autenticação baseada em JWT (JSON Web Token).
- **Refresh Token:** Estratégia de renovação de acesso para melhor UX e segurança.
- **Invalidação Dinâmica:** Tokens são invalidados automaticamente caso a senha seja alterada (`passwordChangeAt`).

### Recuperação de Acesso
- **Forgot Password:** Fluxo de solicitação de recuperação via e-mail (emissão de token).
- **Reset Password:** Redefinição de senha segura utilizando tokens temporários.

---

## 🏗️ Arquitetura e Tecnologias

Este projeto foi estruturado seguindo a **Clean Architecture**, separando responsabilidades em camadas (Domain, Use Cases, Repositories e Controllers).

- **Runtime:** Node.js
- **Framework:** [Fastify](https://www.fastify.io/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Banco de Dados:** PostgreSQL
- **Testes:** Vitest (Unitários e Integração)
- **Documentação:** Swagger / OpenAPI 3.0

---

## 🔑 Endpoints

| Método | Rota | Descrição | Protegida? |
| :--- | :--- | :--- | :---: |
| `POST` | `/usuarios` | Cria um novo usuário | ❌ |
| `POST` | `/auth/login` | Realiza login e retorna tokens | ❌ |
| `POST` | `/auth/refresh` | Gera um novo Access Token | ❌ |
| `GET` | `/auth/.well-known/jwks.json` | Obtém a private key para verificação do access token | ❌ |
| `PATCH` | `/usuarios/password/change` | Altera a senha (logado) | ✅ |
| `POST` | `/usuarios/password/forgot` | Solicita token de reset | ❌ |
| `POST` | `/usuarios/password/reset` | Redefine senha via token | ❌ |
| `DELETE` | `/usuarios` | Remove a conta do usuário | ✅ | 

> **Documentação Completa:** Com o servidor rodando, acesse `http://localhost:3100/docs`

---

## ⚙️ Instalação e Execução

### Pré-requisitos
- Node.js (v18+)
- Instância de PostgreSQL ativa

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/ricardoabicalhob/AuthAPI.git](https://github.com/ricardoabicalhob/AuthAPI.git)
   cd authapi

2. **Instale as dependências:**
   ```bash
   npm install

3. **Configure as variáveis de ambiente:**
   ```bash
   Exemplo de configuração (.env)

    # Database
    DATABASE_URL="postgresql://user:password@localhost:5432/auth_db?schema=public"

    # JWT Secrets (Utilize chaves RS256 convertidas para Base64)
    JWT_PRIVATE_KEY_BASE64=sua_chave_privada_aqui
    JWT_PUBLIC_KEY_BASE64=sua_chave_publica_aqui

    # E-mail service (SMTP)
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=465
    SMTP_SECURE=true
    SMTP_USER=emailparasuaapi@gmail.com
    SMTP_PASS="sua senha de app"
    SMTP_FROM=emailparasuaapi@gmail.com

    # Server
    PORT=3100
    NODE_ENV=dev

4. **Prepare o banco de dados**
   ```bash
   npx prisma migrate dev

5. **Inicie a aplicação:**
   ```bash
   # Desenvolvimento
    npm run dev

   # Produção
    npm run build
    npm start

## 👤 Autor

Desenvolvido por **Ricardo A. Bicalho**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ricardo-bicalho-0a4ba5143/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ricardoabicalhob)

## 📝 Licença
Este projeto está sob a licença MIT.