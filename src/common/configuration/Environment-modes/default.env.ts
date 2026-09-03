/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { EnvironmentInterface } from '../environment.interface';

export const defaultEnv = (): EnvironmentInterface => ({
    port: Number(process.env.PORT),
    fallbackLanguage: process.env.fallbackLanguage as string,
    mongoUri: process.env.mongoUri as string,
    jwtSecret: process.env.jwtSecret as string,
    accessTokenExpireIn: process.env.accessTokenExpireIn as string,
    refreshTokenExpireIn: process.env.refreshTokenExpireIn as string,
    systemAdmin: {
        name: process.env.systemAdminName as string,
        email: process.env.systemAdminEmail as string,
        password: process.env.systemAdminPassword as string,
    },
    awsS3: {
        awsS3Region: process.env.awsS3Region as string,
        awsS3AccessKeyId: process.env.awsS3AccessKeyId as string,
        awsS3SecretAccessKey: process.env.awsS3SecretAccessKey as string,
        awsS3BucketName: process.env.awsS3BucketName as string,
        minioEndpoint: process.env.minioEndpoint as string,
    },
});
