import type { UserResponseDTO } from "../../../interfaces/dtos/User/UserResponseDTO";
import { User } from "../../domain/entities/User.entity";
import { Email } from "../../domain/value-objects/Email";
import { NormalizedName } from "../../domain/value-objects/NameNormalizado";
import { PasswordHash } from "../../domain/value-objects/PasswordHash";

export class UserMapper {
  static toDomain(data: UserResponseDTO): User {

    const email = Email.create(data.email)
    const name = NormalizedName.create(data.name)
    const passwordHash = PasswordHash.create(data.password)

    return User.restore(
      {
        email: email,
        name: name,
        password: passwordHash,
        passwordChangeAt: data.passwordChangeAt,
        passwordResetToken: data.passwordResetToken,
        passwordResetExpiresAt: data.passwordResetExpiresAt,
        deletedAt: data.deletedAt
      },
      data.id
    )
  }
}