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
        this.validateDates(body);
        await this.validateUnitExists(body);
        await this.validateBookingAvailability(body);
    }

    private validateDates(body: CheckAvailabilityDto) {
        if (dayjs(body.check_in).isAfter(body.check_out)) {
            throw new BadRequestException(
                this.i18nService.translate('bookings.CHECK_IN_AFTER_CHECK_OUT'),
            );
        }
    }

    private async validateUnitExists(body: CheckAvailabilityDto) {
        const unit = await this.unitsService.GetById(body.unit_id);
        if (body.kids_count && unit.unit_kids_count < body.kids_count) {
            throw new BadRequestException(
                this.i18nService.translate(
                    'bookings.KIDS_COUNT_EXCEEDS_UNIT_CAPACITY',
                ),
            );
        }
        if (body.adults_count && unit.unit_adults_count < body.adults_count) {
            throw new BadRequestException(
                this.i18nService.translate(
                    'bookings.ADULTS_COUNT_EXCEEDS_UNIT_CAPACITY',
                ),
            );
        }
    }

    private async validateBookingAvailability(body: CheckAvailabilityDto) {
        const overlappingBookings = await this.bookingRepository.find({
            unit_id: body.unit_id,
            status: { $in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
            check_in: { $lte: body.check_out },
            check_out: { $gte: body.check_in },
        });

        if (overlappingBookings.length > 0) {
            throw new BadRequestException(
                this.i18nService.translate('bookings.UNIT_ALREADY_BOOKED'),
            );
        }
    }
}
