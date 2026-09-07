import { Injectable } from '@nestjs/common';
import { UpdateBookingRequestDto } from '../dtos/update-booking.dto';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { BookingRepository } from '../repositories/booking.repository';
import { ForbiddenException } from '../../common/error-handling/custom-exceptions/forbidden.exception';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { BookingValidationUseCase } from './booking-validation.usecase';
import { NotFoundException } from '../../common/error-handling/custom-exceptions/not-found.exception';
import dayjs from 'dayjs';
import { plainToInstance } from 'class-transformer';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class UpdateBookingByGuestUsecase {
    constructor(
        private readonly bookingRepository: BookingRepository,
        private readonly bookingValidationUseCase: BookingValidationUseCase,
        private readonly i18nService: I18nService,
    ) {}

    async execute(
        id: string,
        body: UpdateBookingRequestDto,
        user: CurrentUserData,
    ): Promise<BookingResponseDto> {
        const booking = await this.bookingRepository.findById(id);
        if (!booking)
            throw new NotFoundException(
                this.i18nService.translate('bookings.BOOKING_NOT_FOUND'),
            );

        this.checkGuestAuth(booking?.guest_id.toString(), user._id.toString());

        await this.validateDateRange(
            body,
            booking.unit_id.toString(),
            booking._id.toString(),
        );

        await this.validateCapacity(
            body?.adults_count,
            body?.kids_count,
            booking.unit_id.toString(),
        );

        const updatedBooking = await this.bookingRepository.findByIdAndUpdate(
            id,
            {
                $set: body,
            },
            {
                returnDocument: 'after',
                lean: true,
            },
        );

        return plainToInstance(BookingResponseDto, updatedBooking);
    }

    private async validateDateRange(
        body: UpdateBookingRequestDto,
        unitId: string,
        bookingId: string,
    ) {
        if (body?.check_in && !body?.check_out)
            throw new BadRequestException(
                this.i18nService.translate('bookings.CHECK_OUT_DATE_REQUIRED'),
            );
        if (body?.check_out && !body?.check_in)
            throw new BadRequestException(
                this.i18nService.translate('bookings.CHECK_IN_DATE_REQUIRED'),
            );

        if (body?.check_in && body?.check_out) {
            body.check_in = dayjs(body.check_in).toDate();
            body.check_out = dayjs(body.check_out).toDate();

            this.bookingValidationUseCase.validateDates(
                body.check_in,
                body.check_out,
            );

            await this.bookingValidationUseCase.validateBookingAvailability(
                unitId,
                body.check_in,
                body.check_out,
                bookingId,
            );
        }
    }

    private async validateCapacity(
        adultsCount: number | undefined,
        kidsCount: number | undefined,
        unit: string,
    ) {
        if (adultsCount || kidsCount)
            await this.bookingValidationUseCase.validateUnitExists(
                adultsCount,
                kidsCount,
                unit,
            );
    }

    private checkGuestAuth(bookingGuest: string, currentUser: string) {
        if (bookingGuest !== currentUser)
            throw new ForbiddenException(
                this.i18nService.translate('bookings.FORBIDDEN_UPDATE_BOOKING'),
            );
    }
}
