import { Roles } from '../../common/constants/roles.constans';
export interface CurrentUserData {
    _id: string;
    name: string;
    email: string;
}

export interface IPrincipal {
    user: CurrentUserData;
    role: Roles;
}
