import { Injectable } from '@nestjs/common';
import { BookingCalculationResponse } from '../dtos/booking-calculation-response';
import dayjs from 'dayjs';
import { UnitsService } from 'src/units/units.service';
import { AppSettingsService } from 'src/app-settings/app-settings.service';

@Injectable()
export class BookingCalculationUseCase {
    constructor(
        private readonly AppSettingsService: AppSettingsService,
        private readonly unitsService: UnitsService,
    ) {}
    async execute(
        unitId: string,
        checkIn: Date | number,
        checkOut: Date | number,
    ): Promise<BookingCalculationResponse> {
        const nights_count = dayjs(checkOut).diff(dayjs(checkIn), 'day');
        const unit = await this.unitsService.GetById(unitId);
        const price_per_night = unit.unit_cost_per_night;
        const booking_amount = price_per_night * nights_count;
        const AppSettings = await this.AppSettingsService.get();
        const vat = AppSettings.vat_rate;
        const vat_amount = (booking_amount * vat) / 100;
        const total_amount = booking_amount + vat_amount;

        return {
            price_per_night,
            nights_count,
            booking_amount,
            vat,
            vat_amount,
            total_amount,
        };
    }
}
