import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from './common/configuration/environment.interface';

@Injectable()
export class AppService {
    constructor(private configService: ConfigService<EnvironmentInterface>) {}
    getHello(): string {
        console.log(`lol:`, this.configService.get('port'));
        return 'Hello World!';
    }
}
