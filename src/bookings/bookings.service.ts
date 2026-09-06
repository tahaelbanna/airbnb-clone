import { Injectable } from '@nestjs/common';
import { CheckAvailabilityUseCase } from './use-cases/check-availability.usecase';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';

@Injectable()
export class BookingsService {
    constructor(
        private readonly checkAvailabilityUseCase: CheckAvailabilityUseCase,
    ) {}

    async checkAvailability(
        body: CheckAvailabilityDto,
    ): Promise<AvailabilityResponseDto> {
        return this.checkAvailabilityUseCase.execute(body);
    }
}
