/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { UsersService } from '../../users/users.service';
import { registerDto } from '../dtos/register.dto';
import { GenerateTokensUsecase } from './generate-token.usecase';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from 'src/users/dtos/user-response.dto';
import { RegisterResponseDto } from '../dtos/register-response.dto';
import { Roles } from '../../common/constants/roles.constans';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { OtpService } from 'src/otp/otp.service';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class RegisterUsecase {
    constructor(
        private readonly usersService: UsersService,
        private readonly generateTokensUsecase: GenerateTokensUsecase,
        private readonly otpService: OtpService,
        private readonly i18nService: I18nService,
    ) {}
    async execute(body: registerDto): Promise<RegisterResponseDto> {
        await this.validateEmailVerification(body.email);
        const user = await this.usersService.createUser(body);
        const { accessToken, refreshToken } =
            await this.generateTokensUsecase.execute({
                id: (user as any)._id.toString(),
                role: Roles.USER,
            });
        return plainToInstance(
            RegisterResponseDto,
            {
                user: plainToInstance(UserResponseDto, user),
                accessToken,
                refreshToken,
            },
            { excludeExtraneousValues: true },
        );
    }

    private async validateEmailVerification(email: string): Promise<void> {
        const otp = await this.otpService.getOtpRaw({ email });
        if (!otp || !otp.isVerified)
            throw new BadRequestException(
                this.i18nService.translate('email.EMAIL_NOT_VERIFIED'),
            );
    }
}
