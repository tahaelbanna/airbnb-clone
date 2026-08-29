/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { UsersService } from '../../users/users.service';
import { registerDto } from '../dto/register.dto';
import { GenerateTokensUsecase } from './generate-token.usecase';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { RegisterResponseDto } from '../dto/register-response.dto';
import { Roles } from '../../common/constants/roles.constans';

@Injectable()
export class RegisterUsecase {
    constructor(
        private readonly usersService: UsersService,
        private readonly generateTokensUsecase: GenerateTokensUsecase,
    ) {}
    async execute(body: registerDto): Promise<RegisterResponseDto> {
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
}
