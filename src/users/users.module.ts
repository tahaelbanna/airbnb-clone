import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserSchema } from './Schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserUsecase } from './use-cases/create-user.usecase';

@Module({
    providers: [UsersService, CreateUserUsecase],
    exports: [UsersService],
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
})
export class UsersModule {}
