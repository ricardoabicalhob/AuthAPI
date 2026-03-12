import { NameMinimumCharacterLimitError } from "../erros/NameMinimumCharacterLimitError"
import { NameIsRequiredError } from "../erros/NameIsRequiredError"

export class NormalizedName {
    private readonly value :string

    private constructor(value :string) {
        this.value = value
    }

    static create(value :string) {
        if(!value) {
            throw new NameIsRequiredError()
        }

        const normalizado = value.trim().toUpperCase()

        if(normalizado.length < 3) {
            throw new NameMinimumCharacterLimitError()
        }

        return new NormalizedName(normalizado)
    }

    getValue() :string{
        return this.value
    }

    equals(other?: NormalizedName): boolean {
        if (!other) return false
        return this.value === other.value
    }
}