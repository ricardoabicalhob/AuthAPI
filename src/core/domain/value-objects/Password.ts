import { PasswordCharactersNotAllowedError } from "../erros/PasswordCharactersNotAllowedError"
import { PasswordIsRequiredError } from "../erros/PasswordIsRequiredError"
import { PasswordMinimumCharacterLimitError } from "../erros/PasswordMinimumCharacterLimitError"
import { PasswordMinimumLowercaseLimitError } from "../erros/PasswordMinimumLowercaseLimitError"
import { PasswordMinimumNumberLimitError } from "../erros/PasswordMinimumNumberLimitError"
import { PasswordMinimumSpecialCharacterLimitError } from "../erros/PasswordMinimumSpecialCharacterLimitError"
import { PasswordMinimumUppercaseLimitError } from "../erros/PasswordMinimumUppercaseLimitError"

export class Password {

  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(password: string): Password {
    Password.validate(password)
    return new Password(password)
  }

  getValue(): string {
    return this.value
  }

  private static validate(password: string) {

    if (!password) {
      throw new PasswordIsRequiredError()
    }

    const rules = [
      { error: PasswordMinimumCharacterLimitError, valid: password.length >= 8 },
      { error: PasswordMinimumLowercaseLimitError, valid: /[a-z]/.test(password) },
      { error: PasswordMinimumUppercaseLimitError, valid: /[A-Z]/.test(password) },
      { error: PasswordMinimumNumberLimitError, valid: /\d/.test(password) },
      { error: PasswordMinimumSpecialCharacterLimitError, valid: /[@#$!%*?&{}.;]/.test(password) },
      { error: PasswordCharactersNotAllowedError, valid: /^[A-Za-z\d@#$!%*?&{}.;]+$/.test(password) }
    ]

    for (const rule of rules) {
      if (!rule.valid) {
        throw new rule.error
      }
    }
  }
}