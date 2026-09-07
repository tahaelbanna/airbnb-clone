import { Injectable } from '@nestjs/common';
import { BookingRepository } from '../repositories/booking.repository';
import { ForbiddenException } from 'src/common/error-handling/custom-exceptions/forbidden.exception';
import { NotFoundException } from 'src/common/error-handling/custom-exceptions/not-found.exception';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class CheckCurrentUserUseCase {
    constructor(
        private readonly bookingRepository: BookingRepository,
        private readonly i18nService: I18nService,
    ) {}
    async execute(bookingId: string, userId: string): Promise<void> {
        const booking = await this.bookingRepository.findById(bookingId);
        if (!booking) {
            throw new NotFoundException(
                this.i18nService.translate('bookings.BOOKING_NOT_FOUND'),
            );
        }

        if (
            booking.guest_id.toString() !== userId.toString() &&
            booking.host_id.toString() !== userId.toString()
        )
            throw new ForbiddenException(
                this.i18nService.translate('bookings.BOOKING_FORBIDDEN'),
            );
    }
}
