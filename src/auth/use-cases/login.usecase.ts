import { Injectable } from '@nestjs/common';
import { loginDto } from '../dto/login.dto';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/users.service';
import { GenerateTokensUsecase } from './generate-token.usecase';

@Injectable()
export class LoginUsecase {
    constructor(
        private readonly usersService: UsersService,
        private readonly i18nService: I18nService,
        private readonly generateTokensUsecase: GenerateTokensUsecase,
    ) {}
    async execute(body: loginDto) {
        const user = await this.usersService.findOne({ email: body.email });
        if (!user) {
            throw new BadRequestException(
                this.i18nService.translate('auth.INVALID_CREDENTIALS'),
            );
        }
        const isPasswordMatched = await bcrypt.compare(
            body.password,
            user.password,
        );
        if (!isPasswordMatched) {
            throw new BadRequestException(
                this.i18nService.translate('auth.INVALID_CREDENTIALS'),
            );
        }
        const token = await this.generateTokensUsecase.execute(
            user._id.toString(),
        );
        return { token };
    }
}
