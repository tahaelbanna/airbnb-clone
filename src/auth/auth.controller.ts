import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { refreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    register(@Body() body: registerDto) {
        return this.authService.register(body);
    }

    @Post('login')
    login(@Body() body: loginDto) {
        return this.authService.login(body);
    }

    @Post('refresh-token')
    refreshToken(@Body() body: refreshTokenDto) {
        return this.authService.refreshToken(body);
    }
}
