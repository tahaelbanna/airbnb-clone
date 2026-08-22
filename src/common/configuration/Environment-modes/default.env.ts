/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { EnvironmentInterface } from '../environment.interface';

export const defaultEnv = (): EnvironmentInterface => ({
    port: Number(process.env.PORT),
    fallbackLanguage: process.env.fallbackLanguage as string,
    mongoUri: process.env.mongoUri as string,
    jwtSecret: process.env.jwtSecret as string,
    accessTokenExpireIn: process.env.accessTokenExpireIn as string,
    refreshTokenExpireIn: process.env.refreshTokenExpireIn as string,
});
