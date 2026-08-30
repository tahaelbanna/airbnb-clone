import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { IS_ROLES_KEY } from '../decorators/roles.decorator';
import { Roles } from '../../common/constants/roles.constans';
import { RequestWithUser } from './jwt-auth.guard';
import { ForbiddenException } from '../../common/error-handling/custom-exceptions/forbidden.exception';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class RoleGuardG implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly i18nService: I18nService,
    ) {}
    canActivate(context: ExecutionContext): Promise<boolean> | boolean {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (isPublic) return true;

        const roles = this.reflector.getAllAndOverride<Roles[]>(IS_ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!roles) return true;

        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const principal = request.principal;
        const requestRole = principal?.role;
        const canAccess = roles.includes(requestRole);
        if (!canAccess) {
            throw new ForbiddenException(
                this.i18nService.translate('auth.FORBIDDEN'),
            );
        }
        return true;
    }
}
