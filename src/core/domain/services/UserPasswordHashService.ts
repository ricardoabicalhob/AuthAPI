import bcrypt from "bcrypt"

export class UserPasswordHashService {
    hash(input :string) {
        return bcrypt.hash(input, 10)
    }
}