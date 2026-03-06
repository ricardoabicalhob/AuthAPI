"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
const node_crypto_1 = require("node:crypto");
class RefreshToken {
    props;
    id;
    constructor(props, id) {
        this.props = props;
        this.id = id;
    }
    static create(props) {
        return new RefreshToken({
            ...props,
            revokedAt: null,
            createdAt: new Date()
        }, (0, node_crypto_1.randomUUID)());
    }
    static restore(props, id) {
        return new RefreshToken(props, id);
    }
    getId() {
        return this.id;
    }
    getUserId() {
        return this.props.userId;
    }
    getTokenHash() {
        return this.props.tokenHash;
    }
    getExpiresAt() {
        return this.props.expiresAt;
    }
    getCreatedAt() {
        return this.props.createdAt;
    }
    getRevokedAt() {
        return this.props.revokedAt ?? null;
    }
    revoke() {
        if (this.props.revokedAt)
            return;
        this.props.revokedAt = new Date();
    }
    isExpired() {
        return new Date() > this.props.expiresAt;
    }
    isRevoked() {
        return !!this.props.revokedAt;
    }
    isActive() {
        return !this.isExpired() && !this.isRevoked();
    }
}
exports.RefreshToken = RefreshToken;
//# sourceMappingURL=RefreshToken.js.map