import * as Joi from 'joi';

export const envSchema = Joi.object({
    PORT: Joi.number().integer().default(3000),
    NODE_ENV: Joi.string().required(),
    fallbackLanguage: Joi.string().required().default('en'),
    mongoUri: Joi.string()
        .required()
        .default('mongodb://localhost:27017/airbnbcloneDB'),
    jwtSecret: Joi.string().required(),
    accessTokenExpireIn: Joi.string().required().default('7d'),
    refreshTokenExpireIn: Joi.string().required().default('15d'),
    systemAdminName: Joi.string().required().default('Admin'),
    systemAdminEmail: Joi.string().required().email(),
    systemAdminPassword: Joi.string().required().min(8).max(20),
    awsS3Region: Joi.string().required(),
    awsS3AccessKeyId: Joi.string().required(),
    awsS3SecretAccessKey: Joi.string().required(),
    awsS3BucketName: Joi.string().required(),
    minioEndpoint: Joi.string().optional().default(''),
});
