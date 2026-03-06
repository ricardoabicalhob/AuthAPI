"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const InvalidCredentialError_1 = require("../../domain/erros/InvalidCredentialError");
const UserNotFoundError_1 = require("../../domain/erros/UserNotFoundError");
const UnauthorizedError_1 = require("../../domain/erros/UnauthorizedError");
const UserMapper_1 = require("../mappers/UserMapper");
class LoginUseCase {
    userQueryRepository;
    refreshTokenRepository;
    tokenService;
    constructor(userQueryRepository, refreshTokenRepository, tokenService) {
        this.userQueryRepository = userQueryRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.tokenService = tokenService;
    }
    async execute(email, password) {
        const userPersistido = await this.userQueryRepository.findByEmail(email);
        if (!userPersistido) {
            throw new UnauthorizedError_1.UnauthorizedError();
        }
        if (userPersistido.deletedAt !== null) {
            throw new UserNotFoundError_1.UserNotFoundError();
        }
        const user = UserMapper_1.UserMapper.toDomain(userPersistido);
        const passwordIsValid = await bcrypt_1.default.compare(password, user.getPassword());
        if (!passwordIsValid) {
            throw new InvalidCredentialError_1.InvalidCredentialsError();
        }
        const accessToken = this.tokenService.generateAccessToken(user.getId(), user.getName(), user.getEmail(), user.getPasswordChangeAt());
        const { token, hash, expiresAt } = this.tokenService.generateRefreshToken();
        await this.refreshTokenRepository.create({
            userId: user.getId(),
            tokenHash: hash,
            expiresAt
        });
        return {
            accessToken,
            refreshToken: token
        };
    }
}
exports.LoginUseCase = LoginUseCase;
//# sourceMappingURL=LoginUseCase.js.map