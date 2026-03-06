"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserUseCase = void 0;
const UserNotFoundError_1 = require("../../domain/erros/UserNotFoundError");
const UserMapper_1 = require("../mappers/UserMapper");
class DeleteUserUseCase {
    userRepository;
    userQueryRepository;
    constructor(userRepository, userQueryRepository) {
        this.userRepository = userRepository;
        this.userQueryRepository = userQueryRepository;
    }
    async execute(userId) {
        const userPersistido = await this.userQueryRepository.findById(userId);
        if (!userPersistido || userPersistido.deletedAt) {
            throw new UserNotFoundError_1.UserNotFoundError();
        }
        const user = UserMapper_1.UserMapper.toDomain(userPersistido);
        user.softDelete();
        await this.userRepository.softDelete(user.getId(), user.getPasswordChangeAtOrThrow(), user.getDeletedAtOrThrow());
    }
}
exports.DeleteUserUseCase = DeleteUserUseCase;
//# sourceMappingURL=DeleteUserUseCase.js.map