import { EnvironmentInterface } from '../environment.interface';
import { defaultEnv } from './default.env';

export const productionEnv = (): EnvironmentInterface => ({
    ...defaultEnv(),
    accessTokenExpireIn: '30m',
    refreshTokenExpireIn: '30d',
});
