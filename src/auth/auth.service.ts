import { Injectable } from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}
    async register(body: registerDto) {
        // create a new user using the UsersService
        await this.usersService.createUser(body);
        // generate a JWT token for the user
        // return the user and the token
    }
}
