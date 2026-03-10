export class PasswordHash {
    private constructor(private readonly value :string) {}

    static create(hash :string) :PasswordHash{
        if(!hash) {
            throw new Error("Password hash é requerido")
        }

        return new PasswordHash(hash)
    }

    getValue() :string{
        return this.value
    }
}