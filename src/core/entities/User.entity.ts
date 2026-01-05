class User {
    constructor(
        public email :string,
        public password :string,
        public id? :string,
        public passwordResetToken? :string,
        public passwordResetExpiresAt? :Date,
        public passwordChangeAt? :Date,
        public deletedAt? :Date
    ) {}
}