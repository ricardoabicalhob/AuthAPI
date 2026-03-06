"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetJwksUseCase = void 0;
const jose_1 = require("jose");
const keys_1 = require("../../../utils/keys");
class GetJwksUseCase {
    async execute() {
        const publicKey = (0, keys_1.getPublicKey)();
        const jwk = await (0, jose_1.exportJWK)(publicKey);
        return {
            keys: [
                {
                    ...jwk,
                    kid: "auth-key-1",
                    alg: "RS256",
                    use: "sig"
                }
            ]
        };
    }
}
exports.GetJwksUseCase = GetJwksUseCase;
//# sourceMappingURL=GetJwksUseCase.js.map