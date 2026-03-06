export declare class GetJwksUseCase {
    execute(): Promise<{
        keys: {
            kid: string;
            alg: string;
            use: string;
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
}
//# sourceMappingURL=GetJwksUseCase.d.ts.map