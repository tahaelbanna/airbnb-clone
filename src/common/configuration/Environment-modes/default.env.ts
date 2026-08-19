import { EnvironmentInterface } from '../environment.interface';

export const defaultEnv = (): EnvironmentInterface => ({
    port: Number(process.env.PORT),
});
