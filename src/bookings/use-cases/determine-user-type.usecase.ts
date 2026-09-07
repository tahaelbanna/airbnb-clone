import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '../../common/error-handling/custom-exceptions/forbidden.exception';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class DetermineUserTypeUseCase {
    constructor(private readonly i18nService: I18nService) {}
    checkIfGuest(bookingGuest: string, currentUser: string) {
        if (bookingGuest !== currentUser)
            throw new ForbiddenException(
                this.i18nService.translate('bookings.FORBIDDEN_UPDATE_BOOKING'),
            );
    }

    checkIfHost(bookingHost: string, currentUser: string) {
        if (bookingHost !== currentUser)
            throw new ForbiddenException(
                this.i18nService.translate('bookings.FORBIDDEN_UPDATE_BOOKING'),
            );
    }
}
