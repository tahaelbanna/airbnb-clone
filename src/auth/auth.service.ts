/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login.dto';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly i18nService: I18nService,
    ) {}

    async register(body: registerDto) {
        // create a new user using the UsersService
        const user = await this.usersService.createUser(body);
        // generate a JWT token for the user
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const token = await this.generateToken((user as any)._id.toString());
        // return the user and the token
        return { user, token };
    }

    async login(body: loginDto) {
        const user = await this.usersService.findOne({ email: body.email });
        if (!user) {
            throw new BadRequestException(
                this.i18nService.translate('auth.INVALID_CREDENTIALS'),
            );
        }
        const isPasswordMatched = await bcrypt.compare(
            body.password,
            user.password,
        );
        if (!isPasswordMatched) {
            throw new BadRequestException(
                this.i18nService.translate('auth.INVALID_CREDENTIALS'),
            );
        }
        const token = await this.generateToken(user._id.toString());
        return { token };
    }

    private async generateToken(id: string) {
        // generate a JWT token for the user
        const accessToken = await this.jwtService.signAsync({ id });
        return { accessToken };
    }
}
