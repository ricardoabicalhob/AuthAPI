"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameNormalizado = void 0;
class NameNormalizado {
    value;
    constructor(name) {
        if (!name) {
            throw new Error("Nome é requerido");
        }
        const normalizado = name.trim().toUpperCase();
        if (normalizado.length < 3) {
            throw new Error("O nome deve possuir no mínimo 3 caracteres");
        }
        this.value = normalizado;
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.NameNormalizado = NameNormalizado;
//# sourceMappingURL=NameNormalizado.js.map