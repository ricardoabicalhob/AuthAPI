import bcrypt from "bcrypt"

export class PasswordHasher {
    hash(input :string) {
        return bcrypt.hash(input, 10)
    }
}