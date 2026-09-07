import { Injectable } from '@nestjs/common';
import { DetermineUserTypeUseCase } from './determine-user-type.usecase';
import { CurrentUserData } from 'src/auth/interfaces/principal.interface';
import { CancelBookingByGuestDto } from '../dtos/booking-cancelation.dto';
import { BookingRepository } from '../repositories/booking.repository';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';
import { BookingStatus } from '../enums/booking-status.enum';
import { plainToInstance } from 'class-transformer';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { BookingCancelledBy } from '../enums/booking-cancelled-by.enum';

@Injectable()
export class CancelBookingByGuestUseCase {
    constructor(
        private readonly determineUserTypeUseCase: DetermineUserTypeUseCase,
        private readonly bookingRepository: BookingRepository,
        private readonly i18nService: I18nService,
    ) {}
    async execute(
        id: string,
        currentUser: CurrentUserData,
        body: CancelBookingByGuestDto,
    ): Promise<BookingResponseDto> {
        const booking = await this.bookingRepository.findById(id);
        if (!booking) {
            throw new BadRequestException(
                this.i18nService.translate('bookings.BOOKING_NOT_FOUND'),
            );
        }

        this.determineUserTypeUseCase.checkIfGuest(
            booking.guest_id.toString(),
            currentUser._id.toString(),
        );

        if (
            booking.status === BookingStatus.CANCELLED ||
            booking.status === BookingStatus.COMPLETED
        ) {
            throw new BadRequestException(
                this.i18nService.translate(
                    'bookings.BOOKING_CANNOT_BE_CANCELLED',
                ),
            );
        }

        const updatedBooking = await this.bookingRepository.findOneAndUpdate(
            { _id: id },
            {
                status: BookingStatus.CANCELLED,
                cancellation_reason: body?.cancellation_reason,
                cancellation_date: new Date(),
                cancelled_by: BookingCancelledBy.GUEST,
            },
            { returnDocument: 'after', lean: true },
        );

        return plainToInstance(BookingResponseDto, updatedBooking);
    }
}
