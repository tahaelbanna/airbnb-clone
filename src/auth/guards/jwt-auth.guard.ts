import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { UnauthorizedException } from '../../common/error-handling/custom-exceptions/unauthorized.exception';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { IPrincipal } from '../interfaces/principal.interface';
import { Roles } from '../../common/constants';
import { SystemAdminResponseDto } from 'src/system-admin/dtos/system-admin-response.dto';
import { UserResponseDto } from 'src/users/dtos/user-response.dto';
import { UsersService } from '../../users/users.service';
import { SystemAdminService } from '../../system-admin/system-admin.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { I18nService } from 'nestjs-i18n';

export type RequestWithUser = Request & {
    principal: IPrincipal;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private logger = new Logger(JwtAuthGuard.name);
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        private readonly systemAdminService: SystemAdminService,
        private readonly i18nService: I18nService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (isPublic) return true;

        const request = context.switchToHttp().getRequest<RequestWithUser>();

        const token = request.headers['authorization']?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException(
                await this.i18nService.translate('auth.UNAUTHORIZED'),
            );
        }

        try {
            const payload: JwtPayload = this.jwtService.verify(token);

            const currentAccount: IPrincipal =
                await this.buildCurrentUser(payload);

            request.principal = currentAccount;
        } catch {
            throw new UnauthorizedException(
                await this.i18nService.translate('auth.INVALID_TOKEN'),
            );
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
