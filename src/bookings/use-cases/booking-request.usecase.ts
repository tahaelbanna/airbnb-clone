import { Injectable } from '@nestjs/common';
import { CheckAvailabilityUseCase } from './check-availability.usecase';
import { BookingRequestDto } from '../dtos/booking-request.dto';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { BookingRepository } from '../repositories/booking.repository';
import { BookingCalculationUseCase } from './booking-calculation.usecase';
import { UnitsService } from 'src/units/units.service';
import { CurrentUserData } from 'src/auth/interfaces/principal.interface';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';
import dayjs from 'dayjs';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BookingRequestUseCase {
    constructor(
        private readonly checkAvailabilityUseCase: CheckAvailabilityUseCase,
        private readonly bookingRepository: BookingRepository,
        private readonly bookingCalculationUseCase: BookingCalculationUseCase,
        private readonly unitsService: UnitsService,
        private readonly i18nService: I18nService,
    ) {}

    async execute(
        body: BookingRequestDto,
        currentUser: CurrentUserData,
    ): Promise<BookingResponseDto> {
        const { unit_owner_id } = await this.validateUserOwnership(
            body,
            currentUser,
        );

        await this.checkAvailabilityUseCase.execute(body);

        const {
            price_per_night,
            nights_count,
            booking_amount,
            vat,
            vat_amount,
            total_amount,
        } = await this.bookingCalculationUseCase.execute(
            body.unit_id,
            body.check_in,
            body.check_out,
        );

        body.check_in = dayjs(body.check_in).toDate();
        body.check_out = dayjs(body.check_out).toDate();
        const result = await this.bookingRepository.create({
            ...body,
            guest_id: currentUser._id,
            host_id: unit_owner_id,
            price_per_night,
            nights_count,
            booking_amount,
            vat,
            vat_amount,
            total_amount,
        });
        return plainToInstance(BookingResponseDto, result.toObject());
    }

    private async validateUserOwnership(
        body: BookingRequestDto,
        currentUser: CurrentUserData,
    ): Promise<{ unit_owner_id: string }> {
        const unit = await this.unitsService.GetById(body.unit_id);
        if (unit.unit_owner_id.toString() === currentUser._id.toString()) {
            throw new BadRequestException(
                this.i18nService.translate('bookings.CANNOT_BOOK_OWN_UNIT'),
            );
        }
        return { unit_owner_id: unit.unit_owner_id };
    }
}
