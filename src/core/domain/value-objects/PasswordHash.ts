import { PasswordHashIsRequiredError } from "../erros/PasswordHashIsRequiredError"

export class PasswordHash {
    private constructor(private readonly value :string) {}

    static create(hash :string) :PasswordHash{
        if(!hash) {
            throw new PasswordHashIsRequiredError()
        }

        return new PasswordHash(hash)
    }

    getValue() :string{
        return this.value
    }
}