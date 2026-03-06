"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const User_entity_1 = require("../../domain/entities/User.entity");
const NameNormalizado_1 = require("../../domain/value-objects/NameNormalizado");
class UserMapper {
    static toDomain(data) {
        return User_entity_1.User.restore({
            email: data.email,
            name: new NameNormalizado_1.NameNormalizado(data.name),
            password: data.password,
            passwordChangeAt: data.passwordChangeAt,
            passwordResetToken: data.passwordResetToken,
            passwordResetExpiresAt: data.passwordResetExpiresAt,
            deletedAt: data.deletedAt
        }, data.id);
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=UserMapper.js.map