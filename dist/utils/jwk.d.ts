export declare function getJwks(): Promise<{
    keys: {
        use: string;
        alg: string;
        kid: string;
        crv?: string;
        d?: string;
        dp?: string;
        dq?: string;
        e?: string;
        k?: string;
        n?: string;
        p?: string;
        q?: string;
        qi?: string;
        x?: string;
        y?: string;
        pub?: string;
        priv?: string;
        kty?: string;
        key_ops?: string[];
        ext?: boolean;
        x5c?: string[];
        x5t?: string;
        'x5t#S256'?: string;
        x5u?: string;
    }[];
}>;
//# sourceMappingURL=jwk.d.ts.map