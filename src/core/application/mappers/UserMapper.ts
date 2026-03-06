import type { UserResponseDTO } from "../../../interfaces/dtos/User/UserResponseDTO";
import { User } from "../../domain/entities/User.entity";
import { NameNormalizado } from "../../domain/value-objects/NameNormalizado";

export class UserMapper {
  static toDomain(data: UserResponseDTO): User {
    return User.restore(
      {
        email: data.email,
        name: new NameNormalizado(data.name),
        password: data.password,
        passwordChangeAt: data.passwordChangeAt,
        passwordResetToken: data.passwordResetToken,
        passwordResetExpiresAt: data.passwordResetExpiresAt,
        deletedAt: data.deletedAt
      },
      data.id
    )
  }
}