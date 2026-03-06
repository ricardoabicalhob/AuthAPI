export class NameNormalizado {
    private readonly value :string

    constructor(name :string) {
        if(!name) {
            throw new Error("Nome é requerido")
        }

        const normalizado = name.trim().toUpperCase()

        if(normalizado.length < 3) {
            throw new Error("O nome deve possuir no mínimo 3 caracteres")
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