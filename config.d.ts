declare const _default: (() => {
    mongo: {
        dbname: string;
        user: string;
        password: string;
        port: string;
        hostname: string;
        connection: string;
        params: string;
    };
    session: {
        accessToken: string;
        jwtAccessTokenSecret: string;
        jwtAccessTokenExpiresTime: string;
        jwtRefreshTokenSecret: string;
        jwtRefreshTokenExpiresTime: string;
    };
    frontend: {
        url: string;
        urlinfo: string;
    };
    s3: {
        bucket: string;
        region: string;
        accessKeyId: string;
        secretAccessKey: string;
        url: string;
    };
    mail: {
        host: string;
        user: string;
        pass: string;
        from: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    mongo: {
        dbname: string;
        user: string;
        password: string;
        port: string;
        hostname: string;
        connection: string;
        params: string;
    };
    session: {
        accessToken: string;
        jwtAccessTokenSecret: string;
        jwtAccessTokenExpiresTime: string;
        jwtRefreshTokenSecret: string;
        jwtRefreshTokenExpiresTime: string;
    };
    frontend: {
        url: string;
        urlinfo: string;
    };
    s3: {
        bucket: string;
        region: string;
        accessKeyId: string;
        secretAccessKey: string;
        url: string;
    };
    mail: {
        host: string;
        user: string;
        pass: string;
        from: string;
    };
}>;
export default _default;
