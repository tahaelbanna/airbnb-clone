import { Body, Controller, Get, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { Public } from '../auth/decorators/public.decorator';

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
}
