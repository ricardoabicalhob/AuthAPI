import { NameMinimumCharacterLimitError } from "../erros/NameMinimumCharacterLimitError"
import { NameIsRequiredError } from "../erros/NameIsRequiredError"

export class NameNormalizado {
    private readonly value :string

    constructor(name :string) {
        if(!name) {
            throw new NameIsRequiredError()
        }

        const normalizado = name.trim().toUpperCase()

        if(normalizado.length < 3) {
            throw new NameMinimumCharacterLimitError()
        }

        this.value = normalizado
    }

    getValue() :string{
        return this.value
    }

    equals(other :NameNormalizado) :boolean{
        return this.value === other.value
    }
}