/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(body: registerDto) {
        // create a new user using the UsersService
        const user = await this.usersService.createUser(body);
        // generate a JWT token for the user
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const token = await this.generateToken(user._id.toString());
        // return the user and the token
        return { user, token };
    }

    private async generateToken(id: string) {
        // generate a JWT token for the user
        const accessToken = await this.jwtService.signAsync({ id });
        return { accessToken };
    }
}
