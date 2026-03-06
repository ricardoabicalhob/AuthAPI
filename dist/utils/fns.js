"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseKeyBase64ToUTF8 = parseKeyBase64ToUTF8;
function parseKeyBase64ToUTF8(key_base64) {
    return Buffer
        .from(key_base64, "base64")
        .toString("utf-8");
}
// const privateKey = Buffer
//   .from(process.env.JWT_PRIVATE_KEY_BASE64!, "base64")
//   .toString("utf-8")
// const publicKey = Buffer
//   .from(process.env.JWT_PUBLIC_KEY_BASE64!, "base64")
//   .toString("utf-8")
//# sourceMappingURL=fns.js.map