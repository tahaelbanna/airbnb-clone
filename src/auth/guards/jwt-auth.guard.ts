import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UnauthorizedException } from '../../common/error-handling/custom-exceptions/unauthorized.exception';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { IPrincipal } from '../interface/principal.interface';
import { Roles } from '../../common/constants';
import { SystemAdminResponseDto } from 'src/system-admin/dto/system-admin-response.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { UsersService } from '../../users/users.service';
import { SystemAdminService } from '../../system-admin/system-admin.service';

type RequestWithUser = Request & {
    user: IPrincipal;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        private readonly systemAdminService: SystemAdminService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<RequestWithUser>();

        const token = request.headers['authorization']?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const payload: JwtPayload = this.jwtService.verify(token);

            const currentAccount: IPrincipal =
                await this.buildCurrentUser(payload);

            request.user = currentAccount;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }

        return true;
    }

    private async buildCurrentUser(payload: JwtPayload): Promise<IPrincipal> {
        let currentAccount: UserResponseDto | SystemAdminResponseDto;
        if (payload.role === Roles.USER) {
            currentAccount = await this.userService.findOne({
                _id: payload.id,
            });
        } else {
            currentAccount = await this.systemAdminService.getSystemAdmin({
                _id: payload.id,
            });
        }
        return {
            user: {
                _id: currentAccount._id,
                name: currentAccount.name,
                email: currentAccount.email,
            },
            role: payload.role,
        };
    }
}
