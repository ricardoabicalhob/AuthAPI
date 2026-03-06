"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const crypto_1 = require("crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = require("../../../utils/keys");
class TokenService {
    privateKey = (0, keys_1.getPrivateKey)();
    publicKey = (0, keys_1.getPublicKey)();
    generateAccessToken(userId, name, email, passwordChangeAt) {
        return jsonwebtoken_1.default.sign({
            name,
            email,
            passwordChangeAt: passwordChangeAt
                ? Math.floor(passwordChangeAt.getTime() / 1000)
                : undefined
        }, this.privateKey, {
            algorithm: "RS256",
            subject: userId,
            expiresIn: "15m",
            issuer: "https://api-authapi.ricardodev.cloud",
            audience: "sgra-api",
            keyid: "auth-key-1"
        });
    }
    generateRefreshToken() {
        const token = (0, crypto_1.randomBytes)(40).toString("hex");
        const hash = (0, crypto_1.createHash)("sha256")
            .update(token)
            .digest("hex");
        return {
            token,
            hash,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        };
    }
    verifyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, this.publicKey, {
            algorithms: ["RS256"],
            issuer: "https://api-authapi.ricardodev.cloud",
            audience: "sgra-api"
        });
    }
    hashToken(token) {
        return (0, crypto_1.createHash)("sha256")
            .update(token)
            .digest("hex");
    }
    generateResetToken() {
        const token = (0, crypto_1.randomBytes)(32).toString('hex');
        const hash = (0, crypto_1.createHash)("sha256").update(token).digest("hex");
        return { token, hash };
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=TokenService.js.map