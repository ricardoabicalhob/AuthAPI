"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicKey = getPublicKey;
exports.getPrivateKey = getPrivateKey;
const crypto_1 = require("crypto");
function getPublicKey() {
    const publicKeyPem = Buffer
        .from(process.env.JWT_PUBLIC_KEY_BASE64, "base64")
        .toString("utf-8");
    return (0, crypto_1.createPublicKey)({
        key: publicKeyPem,
        format: "pem",
        type: "spki"
    });
}
function getPrivateKey() {
    const privateKeyPem = Buffer
        .from(process.env.JWT_PRIVATE_KEY_BASE64, "base64")
        .toString("utf-8");
    return (0, crypto_1.createPrivateKey)({
        key: privateKeyPem,
        format: "pem",
        type: "pkcs8"
    });
}
//# sourceMappingURL=keys.js.map