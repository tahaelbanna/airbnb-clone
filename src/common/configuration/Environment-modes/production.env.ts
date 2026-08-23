import { EnvironmentInterface } from '../environment.interface';
import { defaultEnv } from './default.env';

export const productionEnv = (): EnvironmentInterface => ({
    ...defaultEnv(),
    port: 5000,
    accessTokenExpireIn: '30m',
    refreshTokenExpireIn: '30d',
});
