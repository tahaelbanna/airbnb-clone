export interface EnvironmentInterface {
    port: number;
    fallbackLanguage: string;
    mongoUri: string;
    jwtSecret: string;
    accessTokenExpireIn: string;
    refreshTokenExpireIn: string;
}
