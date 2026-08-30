import { Injectable } from '@nestjs/common';
import { User } from './Schemas/user.schema';
import { QueryFilter } from 'mongoose';
import { createUserDto } from './dto/create-user.dto';
import { CreateUserUsecase } from './use-cases/create-user.usecase';
import { UserResponseDto } from './dto/user-response.dto';
import { UserRepository } from './repository/user.repository';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly createUserUsecase: CreateUserUsecase,
    ) {}

    async createUser(body: createUserDto): Promise<UserResponseDto> {
        return this.createUserUsecase.execute(body);
    }
    async findOne(query: QueryFilter<User>) {
        const user = await this.userRepository.findOne(query);
        return plainToInstance(UserResponseDto, user);
    }
}
