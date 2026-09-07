import { Injectable } from '@nestjs/common';
import { UnitsService } from '../../units/units.service';
import { CheckAvailabilityDto } from '../dtos/check-availability.dto';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import dayjs from 'dayjs';
import { I18nService } from 'nestjs-i18n';
import { BookingRepository } from '../repositories/booking.repository';
import { BookingStatus } from '../enums/booking-status.enum';

@Injectable()
export class BookingValidationUseCase {
    constructor(
        private readonly unitsService: UnitsService,
        private readonly i18nService: I18nService,
        private readonly bookingRepository: BookingRepository,
    ) {}

    async execute(body: CheckAvailabilityDto): Promise<void> {
        this.validateDates(body.check_in, body.check_out);
        await this.validateUnitExists(
            body?.adults_count,
            body?.kids_count,
            body.unit_id,
        );
        await this.validateBookingAvailability(
            body.unit_id,
            body.check_in,
            body.check_out,
        );
    }

    validateDates(check_in: number | Date, check_out: number | Date) {
        if (dayjs(check_in).isAfter(check_out)) {
            throw new BadRequestException(
                this.i18nService.translate('bookings.CHECK_IN_AFTER_CHECK_OUT'),
            );
        }
    }

    async validateUnitExists(
        adults_count: number | undefined,
        kids_count: number | undefined,
        unit_id: string,
    ) {
        const unit = await this.unitsService.GetById(unit_id);
        if (kids_count && unit.unit_kids_count < kids_count) {
            throw new BadRequestException(
                this.i18nService.translate(
                    'bookings.KIDS_COUNT_EXCEEDS_UNIT_CAPACITY',
                ),
            );
        }
        if (adults_count && unit.unit_adults_count < adults_count) {
            throw new BadRequestException(
                this.i18nService.translate(
                    'bookings.ADULTS_COUNT_EXCEEDS_UNIT_CAPACITY',
                ),
            );
        }
    }

    async validateBookingAvailability(
        unit_id: string,
        check_in: number | Date,
        check_out: number | Date,
        bookingId?: string,
    ) {
        const overlappingBookings = await this.bookingRepository.find({
            unit_id: unit_id,
            status: { $in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
            check_in: { $lte: check_out },
            check_out: { $gte: check_in },
            _id: { $ne: bookingId },
        });

        if (overlappingBookings.length > 0) {
            throw new BadRequestException(
                this.i18nService.translate('bookings.UNIT_ALREADY_BOOKED'),
            );
        }
    }
}
