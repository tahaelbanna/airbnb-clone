import { Injectable } from '@nestjs/common';
import { loginDto } from '../dtos/login.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { LoginAsAdminUsecase } from './login-as-admin.usecase';
import { LoginAsUserUsecase } from './login-as-user.usecase';
import { Roles } from '../../common/constants/roles.constans';

@Injectable()
export class LoginUsecase {
    constructor(
        private readonly loginAsAdminUsecase: LoginAsAdminUsecase,
        private readonly loginAsUserUsecase: LoginAsUserUsecase,
    ) {}
    async execute(body: loginDto): Promise<AuthResponseDto> {
        if (body.role === Roles.SYSTEM_ADMIN) {
            return this.loginAsAdminUsecase.execute(body);
        }

        if (body.role === Roles.USER) {
            return this.loginAsUserUsecase.execute(body);
        }
    }
}
