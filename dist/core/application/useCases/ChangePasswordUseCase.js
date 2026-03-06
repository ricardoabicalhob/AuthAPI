"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordUseCase = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserNotFoundError_1 = require("../../domain/erros/UserNotFoundError");
const UnauthorizedError_1 = require("../../domain/erros/UnauthorizedError");
const UserMapper_1 = require("../mappers/UserMapper");
class ChangePasswordUseCase {
    userRepository;
    userQueryRepository;
    hashService;
    constructor(userRepository, userQueryRepository, hashService) {
        this.userRepository = userRepository;
        this.userQueryRepository = userQueryRepository;
        this.hashService = hashService;
    }
    async execute(userId, currentPassword, newPassword) {
        const userPersistido = await this.userQueryRepository.findUserWithPasswordById(userId);
        if (!userPersistido) {
            throw new UserNotFoundError_1.UserNotFoundError();
        }
        const user = UserMapper_1.UserMapper.toDomain(userPersistido);
        const passwordMatch = await bcrypt_1.default.compare(currentPassword, user.getPassword());
        if (!passwordMatch) {
            throw new UnauthorizedError_1.UnauthorizedError();
        }
        const newPasswordHash = await this.hashService.hash(newPassword);
        user.changePassword(newPasswordHash);
        await this.userRepository.updatePassword(user.getId(), user.getPassword(), user.getPasswordChangeAtOrThrow());
    }
}
exports.ChangePasswordUseCase = ChangePasswordUseCase;
//# sourceMappingURL=ChangePasswordUseCase.js.map