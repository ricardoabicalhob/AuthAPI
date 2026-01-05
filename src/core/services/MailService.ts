export class MailService {
    async sendPasswordReset(email :string, link :string) {
        console.log(`E-mail enviado para ${ email }: ${ link }`)
    }
}