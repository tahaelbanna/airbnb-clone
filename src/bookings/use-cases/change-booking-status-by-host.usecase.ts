import { Injectable } from '@nestjs/common';
import { ChangeBookingStatusDto } from '../dtos/change-booking-status.dto';
import { CurrentUserData } from 'src/auth/interfaces/principal.interface';
import { BookingRepository } from '../repositories/booking.repository';
import { DetermineUserTypeUseCase } from './determine-user-type.usecase';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { BookingStatus } from '../enums/booking-status.enum';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';
import { plainToInstance } from 'class-transformer';
import { BookingCancelledBy } from '../enums/booking-cancelled-by.enum';

@Injectable()
export class ChangeBookingStatusByHostUseCase {
    constructor(
        private readonly bookingRepository: BookingRepository,
        private readonly determineUserTypeUseCase: DetermineUserTypeUseCase,
        private readonly i18nService: I18nService,
    ) {}

    async execute(
        id: string,
        body: ChangeBookingStatusDto,
        currentUser: CurrentUserData,
    ): Promise<BookingResponseDto> {
        const booking = await this.bookingRepository.findById(id);
        this.determineUserTypeUseCase.checkIfHost(
            booking.host_id.toString(),
            currentUser._id.toString(),
        );
        if (
            body.status === BookingStatus.CONFIRMED &&
            booking.status === BookingStatus.CONFIRMED
        )
            throw new BadRequestException(
                this.i18nService.translate(
                    'bookings.BOOKING_ALREADY_CONFIRMED',
                ),
            );

        if (body.status === BookingStatus.CANCELLED) {
            return await this.BookingCancellation(id, body, booking.status);
        }

        const updatedBooking = await this.bookingRepository.findByIdAndUpdate(
            id,
            {
                status: body.status,
            },
            { returnDocument: 'after', lean: true },
        );

        return plainToInstance(BookingResponseDto, updatedBooking);
    }

    private async BookingCancellation(
        id: string,
        body: ChangeBookingStatusDto,
        currentBookingStatus: BookingStatus,
    ): Promise<BookingResponseDto> {
        if (currentBookingStatus === BookingStatus.CANCELLED) {
            throw new BadRequestException(
                this.i18nService.translate(
                    'bookings.BOOKING_ALREADY_CANCELLED',
                ),
            );
        }
        const updatedBooking = await this.bookingRepository.findByIdAndUpdate(
            id,
            {
                status: BookingStatus.CANCELLED,
                cancellation_reason: body?.cancellation_reason,
                cancellation_date: new Date(),
                cancellation_by: BookingCancelledBy.HOST,
            },
            { returnDocument: 'after', lean: true },
        );
        return plainToInstance(BookingResponseDto, updatedBooking);
    }
}
