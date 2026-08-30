import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../guards/jwt-auth.guard';
import { CurrentUserData, IPrincipal } from '../interface/principal.interface';
import { Roles } from '../../common/constants/roles.constans';
export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        if (!request) {
            return null;
        }
        const { user, role } = request.principal;
        return new Principal(user, role as Roles);
    },
);

export class Principal implements IPrincipal {
    constructor(
        public user: CurrentUserData,
        public role: Roles,
    ) {}
}
