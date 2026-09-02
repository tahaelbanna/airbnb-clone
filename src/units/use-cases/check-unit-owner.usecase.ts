import { CurrentUserData } from 'src/auth/interfaces/principal.interface';
import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from 'src/common/error-handling/custom-exceptions/unauthorized.exception';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class CheckUnitOwnerUseCase {
    constructor(private readonly i18nService: I18nService) {}

    execute(currentUser: CurrentUserData, unitOwnerId: string) {
        if (unitOwnerId !== currentUser._id.toString()) {
            throw new UnauthorizedException(
                this.i18nService.translate('units.UNAUTHORIZED_UPDATE'),
            );
        }
    }
}
