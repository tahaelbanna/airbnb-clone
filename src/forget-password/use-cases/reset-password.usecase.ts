import { Injectable } from '@nestjs/common';
import { ForgetPasswordRepository } from '../repositories/forget-password.repository';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UsersService } from '../../users/users.service';
import * as bcrypt from 'bcrypt';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class ResetPasswordUseCase {
    constructor(
        @InjectConnection()
        private readonly connection: Connection,
        private readonly forgetPasswordRepository: ForgetPasswordRepository,
        private readonly usersService: UsersService,
        private readonly i18nService: I18nService,
    ) {}

    async execute(body: ResetPasswordDto): Promise<void> {
        const forgetPassword = await this.forgetPasswordRepository.findOne({
            email: body.email,
        });

        if (!forgetPassword)
            throw new BadRequestException(
                this.i18nService.translate(
                    'email.EMAIL_NOT_FOUND_FOR_PASSWORD_RESET',
                ),
            );

        if (!forgetPassword.isVerified)
            throw new BadRequestException(
                this.i18nService.translate('email.CODE_NOT_VERIFIED'),
            );

        const session = await this.connection.startSession();

        try {
            await session.withTransaction(async () => {
                const hashedPassword = await bcrypt.hash(body.newPassword, 10);
                await this.usersService.updateUserRaw(
                    { email: body.email },
                    { password: hashedPassword },
                    session,
                );
                await this.forgetPasswordRepository.findOneAndDelete(
                    {
                        email: body.email,
                    },
                    { session },
                );
            });
        } catch {
            await session.abortTransaction();
            throw new BadRequestException(
                this.i18nService.translate('email.FAILED_TO_RESET_PASSWORD'),
            );
        } finally {
            await session.endSession();
        }
    }
}
