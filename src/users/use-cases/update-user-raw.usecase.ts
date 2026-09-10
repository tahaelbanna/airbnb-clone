import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { ClientSession, UpdateQuery } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UpdateUserRawUsecase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(
        query: UpdateQuery<User>,
        data: Record<string, any>,
        session?: ClientSession,
    ): Promise<void> {
        await this.userRepository.findOneAndUpdate(query, data, { session });
    }
}
