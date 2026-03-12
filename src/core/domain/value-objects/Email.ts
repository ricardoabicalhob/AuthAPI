import { EmailIsRequiredError } from "../erros/EmailIsRequiredError"
import { InvalidEmailFormatError } from "../erros/InvalidEmailFormatError"

export class Email {

  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string) {

    if(!value) {
      throw new EmailIsRequiredError()
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(!regex.test(value)) {
      throw new InvalidEmailFormatError()
    }

    return new Email(value.toLowerCase())

  }

  getValue() {
    return this.value
  }

  equals(other: Email) {
    return this.value === other.value
  }

}