import { Injectable } from '@nestjs/common';
import { CheckAvailabilityUseCase } from './use-cases/check-availability.usecase';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { BookingRequestUseCase } from './use-cases/booking-request.usecase';
import { CurrentUserData } from 'src/auth/interfaces/principal.interface';
import { BookingRequestDto } from './dtos/booking-request.dto';
import { BookingResponseDto } from './dtos/booking-response.dto';
import { GetMyBookingsUseCase } from './use-cases/get-my-bookings.usecase';
import { GetAllBookingsUseCase } from './use-cases/get-all-bookings.usecase';
import { PaginatedResult } from '../common/data-access';
import { GetAllBookingsDto } from './dtos/get-all-bookings.dto';
import { GetBookingByIdUseCase } from './use-cases/get-booking-by-id.usecase';
import { Principal } from 'src/auth/decorators/current-user.decorator';

@Injectable()
export class BookingsService {
    constructor(
        private readonly checkAvailabilityUseCase: CheckAvailabilityUseCase,
        private readonly requestBookingUseCase: BookingRequestUseCase,
        private readonly getMyBookingsUseCase: GetMyBookingsUseCase,
        private readonly getAllBookingsUseCase: GetAllBookingsUseCase,
        private readonly getBookingByIdUseCase: GetBookingByIdUseCase,
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

    async getMyBookings(
        query: GetAllBookingsDto,
        currentUser: CurrentUserData,
    ): Promise<PaginatedResult<BookingResponseDto>> {
        return this.getMyBookingsUseCase.execute(query, currentUser);
    }

    async getAllBookings(
        query: GetAllBookingsDto,
    ): Promise<PaginatedResult<BookingResponseDto>> {
        return this.getAllBookingsUseCase.execute(query);
    }

    async getBookingById(
        id: string,
        principal: Principal,
    ): Promise<BookingResponseDto> {
        return this.getBookingByIdUseCase.execute(id, principal);
    }
}
