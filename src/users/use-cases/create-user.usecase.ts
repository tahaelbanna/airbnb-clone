import { Injectable } from '@nestjs/common';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { createUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from '../dtos/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class CreateUserUsecase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(body: createUserDto): Promise<UserResponseDto> {
        const existingUser = await this.userRepository.findOne({
            email: body.email,
        });
        if (existingUser) {
            throw new BadRequestException(
                'User with this email already exists',
            );
        }
        const existingPhone = await this.userRepository.findOne({
            phone: body.phone,
        });
        if (existingPhone) {
            throw new BadRequestException(
                'User with this phone number already exists',
            );
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const createdUser = await this.userRepository.create({
            ...body,
            password: hashedPassword,
        });

        return plainToInstance(UserResponseDto, createdUser.toObject());
    }
}
