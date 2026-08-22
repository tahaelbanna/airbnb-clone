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
});
