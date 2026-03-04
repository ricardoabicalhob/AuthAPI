import type { UserResponseDTO } from "../../../interfaces/dtos/User/UserResponseDTO";
import { User } from "../../domain/entities/User.entity";

export class UserMapper {
  static toDomain(data: UserResponseDTO): User {
    return User.restore(
      {
        email: data.email,
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