import nodemailer from "nodemailer"

export class MailService {
    private transporter

    constructor() {
        // Configuração do SMTP via variáveis de ambiente
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false, // true para porta 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    async sendPasswordReset(email :string, link :string) {
        await this.transporter.sendMail({
            from: `"AuthAPI" <${process.env.SMTP_FROM || "no-reply@authapi.com"}>`,
            to: email,
            subject: "Redefinição de senha",
            html: `
                <h1>Você solicitou uma recuperação de senha</h1>
                <p>Recebemos uma solicitação para redefinir a senha da sua conta. Para prosseguir, clique no link abaixo para criar uma nova senha:</p>
                <p><a href="${link}">${link}</a></p>
                <p>Este link expirará em 15 minutos.</p>
                <p>Se você não solicitou a redefinição da sua senha, ignore este e-mail ou entre em contato conosco. Sua conta permanece segura.</p>
                <p>Atenciosamente,</p>
                <p>AuthAPI Team</p>
            `,
        });
    }
}