import { Body, Controller, Get, Query, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from 'src/common/constants/roles.constans';
import { AllowRoles } from 'src/auth/decorators/roles.decorator';
import { BookingResponseDto } from './dtos/booking-response.dto';
import { BookingRequestDto } from './dtos/booking-request.dto';
import {
    CurrentUser,
    Principal,
} from '../auth/decorators/current-user.decorator';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}

    @Public()
    @Get('/check-availability')
    async checkAvailability(
        @Query() query: CheckAvailabilityDto,
    ): Promise<AvailabilityResponseDto> {
        return this.bookingsService.checkAvailability(query);
    }

    @AllowRoles(Roles.USER)
    @Post()
    async requestBooking(
        @Body() body: BookingRequestDto,
        @CurrentUser() principal: Principal,
    ): Promise<BookingResponseDto> {
        return this.bookingsService.requestBooking(body, principal.user);
    }
}
