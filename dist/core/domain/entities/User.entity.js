"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const node_crypto_1 = require("node:crypto");
class User {
    props;
    id;
    constructor(props, id) {
        this.props = props;
        this.id = id;
    }
    static create(props) {
        return new User(props, (0, node_crypto_1.randomUUID)());
    }
    static restore(props, id) {
        return new User(props, id);
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.props.email;
    }
    getPassword() {
        return this.props.password;
    }
    getName() {
        return this.props.name.getValue();
    }
    getPasswordChangeAt() {
        return this.props.passwordChangeAt;
    }
    getPasswordChangeAtOrThrow() {
        if (!this.props.passwordChangeAt) {
            throw new Error("Password change date not defined");
        }
        return this.props.passwordChangeAt;
    }
    getDeletedAt() {
        return this.props.deletedAt;
    }
    getDeletedAtOrThrow() {
        if (!this.props.deletedAt) {
            throw new Error("Deleted date not defined");
        }
        return this.props.deletedAt;
    }
    getPasswordResetToken() {
        return this.props.passwordResetToken;
    }
    getPasswordResetTokenOrThrow() {
        if (this.props.passwordResetToken === undefined) {
            throw new Error("Password reset token not defined");
        }
        return this.props.passwordResetToken;
    }
    getPasswordResetExpiresAt() {
        return this.props.passwordResetExpiresAt;
    }
    getPasswordResetExpiresAtOrThrow() {
        if (this.props.passwordResetExpiresAt === undefined) {
            throw new Error("Password expires date not defined");
        }
        return this.props.passwordResetExpiresAt;
    }
    changePassword(newPasswordHash) {
        this.props.password = newPasswordHash;
        this.clearPasswordResetToken();
        this.markPasswordChanged();
    }
    markPasswordChanged() {
        this.props.passwordChangeAt = new Date();
    }
    setPasswordResetToken(tokenHash, expiresAt) {
        this.props.passwordResetToken = tokenHash;
        this.props.passwordResetExpiresAt = expiresAt;
    }
    clearPasswordResetToken() {
        this.props.passwordResetToken = null;
        this.props.passwordResetExpiresAt = null;
    }
    isPasswordResetTokenExpired() {
        if (!this.props.passwordResetExpiresAt)
            return true;
        return this.props.passwordResetExpiresAt < new Date();
    }
    softDelete() {
        this.props.deletedAt = new Date();
        this.props.passwordChangeAt = new Date();
    }
    isDeleted() {
        return !!this.props.deletedAt;
    }
}
exports.User = User;
//# sourceMappingURL=User.entity.js.map