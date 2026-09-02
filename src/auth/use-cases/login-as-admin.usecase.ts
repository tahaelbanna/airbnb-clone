/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { loginDto } from '../dtos/login.dto';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n';
import * as bcrypt from 'bcrypt';
import { GenerateTokensUsecase } from './generate-token.usecase';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { plainToInstance } from 'class-transformer';
import { SystemAdminService } from '../../system-admin/system-admin.service';
@Injectable()
export class LoginAsAdminUsecase {
    constructor(
        private readonly systemAdminService: SystemAdminService,
        private readonly i18nService: I18nService,
        private readonly generateTokensUsecase: GenerateTokensUsecase,
    ) {}
    async execute(body: loginDto): Promise<AuthResponseDto> {
        const admin = await this.systemAdminService.getSystemAdmin({
            email: body.email,
        });
        if (!admin) {
            throw new BadRequestException(
                this.i18nService.translate('auth.INVALID_CREDENTIALS'),
            );
        }
        const isPasswordMatched = await bcrypt.compare(
            body.password,
            admin.password,
        );
        if (!isPasswordMatched) {
            throw new BadRequestException(
                this.i18nService.translate('auth.INVALID_CREDENTIALS'),
            );
        }
        const { accessToken, refreshToken } =
            await this.generateTokensUsecase.execute({
                id: (admin as any)._id.toString(),
                role: body.role,
            });
        return plainToInstance(AuthResponseDto, { accessToken, refreshToken });
    }
}
