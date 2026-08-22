import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Schemas/user.schema';
import { Model, QueryFilter } from 'mongoose';
import { createUserDto } from './dto/create-user.dto';
import { CreateUserUsecase } from './use-cases/create-user.usecase';
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly createUserUsecase: CreateUserUsecase,
    ) {}

    async createUser(body: createUserDto): Promise<User> {
        return this.createUserUsecase.execute(body);
    }
    async findOne(query: QueryFilter<User>) {
        return await this.userModel.findOne(query);
    }
}
