/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { UsersService } from '../../users/users.service';
import { registerDto } from '../dto/register.dto';
import { GenerateTokensUsecase } from './generate-token.usecase';
import { Injectable } from '@nestjs/common';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

@Injectable()
export class RegisterUsecase {
    constructor(
        private readonly usersService: UsersService,
        private readonly generateTokensUsecase: GenerateTokensUsecase,
    ) {}
    async execute(body: registerDto): Promise<AuthResponseDto> {
        const user = await this.usersService.createUser(body);
        const { accessToken, refreshToken } =
            await this.generateTokensUsecase.execute(
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                (user as any)._id.toString(),
            );
        return plainToInstance(
            AuthResponseDto,
            {
                user: plainToInstance(UserResponseDto, user),
                accessToken,
                refreshToken,
            },
            { excludeExtraneousValues: true },
        );
    }
}
