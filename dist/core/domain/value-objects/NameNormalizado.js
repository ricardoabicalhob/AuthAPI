"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameNormalizado = void 0;
const NameMinimumCharacterLimitError_1 = require("../erros/NameMinimumCharacterLimitError");
const NameIsRequiredError_1 = require("../erros/NameIsRequiredError");
class NameNormalizado {
    value;
    constructor(name) {
        if (!name) {
            throw new NameIsRequiredError_1.NameIsRequiredError();
        }
        const normalizado = name.trim().toUpperCase();
        if (normalizado.length < 3) {
            throw new NameMinimumCharacterLimitError_1.NameMinimumCharacterLimitError();
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