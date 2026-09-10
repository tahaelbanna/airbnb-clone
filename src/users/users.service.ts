import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { ClientSession, QueryFilter, UpdateQuery } from 'mongoose';
import { createUserDto } from './dtos/create-user.dto';
import { CreateUserUsecase } from './use-cases/create-user.usecase';
import { UserResponseDto } from './dtos/user-response.dto';
import { UserRepository } from './repositories/user.repository';
import { plainToInstance } from 'class-transformer';
import { UpdateUserRawUsecase } from './use-cases/update-user-raw.usecase';

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly createUserUsecase: CreateUserUsecase,
        private readonly updateUserRawUsecase: UpdateUserRawUsecase,
    ) {}

    async createUser(body: createUserDto): Promise<UserResponseDto> {
        return this.createUserUsecase.execute(body);
    }
    async findOne(query: QueryFilter<User>) {
        const user = await this.userRepository.findOne(query);
        return plainToInstance(UserResponseDto, user);
    }
    async updateUserRaw(
        query: UpdateQuery<User>,
        data: Record<string, any>,
        session?: ClientSession,
    ): Promise<void> {
        return this.updateUserRawUsecase.execute(query, data, session);
    }
}
