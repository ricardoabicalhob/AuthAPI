import bcrypt from "bcrypt"

export class HashService {
    hash(password :string) {
        return bcrypt.hash(password, 10)
    }
}