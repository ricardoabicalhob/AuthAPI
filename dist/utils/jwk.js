"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwks = getJwks;
const crypto_1 = require("crypto");
const jose_1 = require("jose");
const publicKeyPem = Buffer
    .from(process.env.JWT_PUBLIC_KEY_BASE64, "base64")
    .toString("utf-8");
async function getJwks() {
    const keyObject = (0, crypto_1.createPublicKey)(publicKeyPem);
    const jwk = await (0, jose_1.exportJWK)(keyObject);
    return {
        keys: [
            {
                ...jwk,
                use: "sig",
                alg: "RS256",
                kid: "auth-key-1"
            }
        ]
    };
}
//# sourceMappingURL=jwk.js.map