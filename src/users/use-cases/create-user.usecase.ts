import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../Schemas/user.schema';
import { Model } from 'mongoose';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { createUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from '../dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateUserUsecase {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    async execute(body: createUserDto): Promise<UserResponseDto> {
        const existingUser = await this.userModel.findOne({
            email: body.email,
        });
        if (existingUser) {
            throw new BadRequestException(
                'User with this email already exists',
            );
        }
        const existingPhone = await this.userModel.findOne({
            phone: body.phone,
        });
        if (existingPhone) {
            throw new BadRequestException(
                'User with this phone number already exists',
            );
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const createdUser = await this.userModel.create({
            ...body,
            password: hashedPassword,
        });

        return plainToInstance(UserResponseDto, createdUser.toObject());
    }
}
