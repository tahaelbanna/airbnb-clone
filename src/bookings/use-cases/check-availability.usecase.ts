import { Injectable } from '@nestjs/common';
import { BookingValidationUseCase } from './booking-validation.usecase';
import { BookingCalculationUseCase } from './booking-calculation.usecase';
import { CheckAvailabilityDto } from '../dtos/check-availability.dto';
import { AvailabilityResponseDto } from '../dtos/availability-response.dto';

@Injectable()
export class CheckAvailabilityUseCase {
    constructor(
        private readonly bookingValidationUseCase: BookingValidationUseCase,
        private readonly bookingCalculationUseCase: BookingCalculationUseCase,
    ) {}
    async execute(
        body: CheckAvailabilityDto,
    ): Promise<AvailabilityResponseDto> {
        await this.bookingValidationUseCase.execute(body);
        const bookingCalculation = await this.bookingCalculationUseCase.execute(
            body.unit_id,
            body.check_in,
            body.check_out,
        );
        return {
            available: true,
            ...bookingCalculation,
        };
    }
}
