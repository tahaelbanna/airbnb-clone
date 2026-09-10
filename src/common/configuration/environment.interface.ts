export interface EnvironmentInterface {
    port: number;
    fallbackLanguage: string;
    mongoUri: string;
    jwtSecret: string;
    accessTokenExpireIn: string;
    refreshTokenExpireIn: string;
    systemAdmin: ISystemAdmin;
    awsS3: IAWSConfig;
    smtp: ISMTPConfig;
}

export interface ISystemAdmin {
    name: string;
    email: string;
    password: string;
}

export interface IAWSConfig {
    awsS3Region: string;
    awsS3AccessKeyId: string;
    awsS3SecretAccessKey: string;
    awsS3BucketName: string;
    minioEndpoint: string;
}

export interface ISMTPConfig {
    smtpHost: string;
    smtpPort: number;
    smtpSecure: boolean;
    auth: {
        user: string;
        pass: string;
    };
}
