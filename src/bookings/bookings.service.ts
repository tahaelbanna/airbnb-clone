import { Injectable } from '@nestjs/common';
import { CheckAvailabilityUseCase } from './use-cases/check-availability.usecase';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { BookingRequestUseCase } from './use-cases/booking-request.usecase';
import { CurrentUserData } from 'src/auth/interfaces/principal.interface';
import { BookingRequestDto } from './dtos/booking-request.dto';
import { BookingResponseDto } from './dtos/booking-response.dto';

@Injectable()
export class BookingsService {
    constructor(
        private readonly checkAvailabilityUseCase: CheckAvailabilityUseCase,
        private readonly requestBookingUseCase: BookingRequestUseCase,
    ) {}

    async checkAvailability(
        body: CheckAvailabilityDto,
    ): Promise<AvailabilityResponseDto> {
        return this.checkAvailabilityUseCase.execute(body);
    }

    async requestBooking(
        body: BookingRequestDto,
        currentUser: CurrentUserData,
    ): Promise<BookingResponseDto> {
        return this.requestBookingUseCase.execute(body, currentUser);
    }
}
