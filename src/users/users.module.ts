import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSchema } from './Schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserUsecase } from './use-cases/create-user.usecase';
import { ModelNames } from '../common/data-access';
import { UserRepository } from './repository/user.repository';

@Module({
    providers: [UsersService, CreateUserUsecase, UserRepository],
    exports: [UsersService],
    imports: [
        MongooseModule.forFeature([
            { name: ModelNames.USERS, schema: UserSchema },
        ]),
    ],
})
export class UsersModule {}
