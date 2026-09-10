import {
    Body,
    Controller,
    Get,
    Query,
    Post,
    Param,
    Patch,
} from '@nestjs/common';
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
import { GetAllBookingsDto } from './dtos/get-all-bookings.dto';
import { PaginatedResult } from 'src/common/data-access/base-repository';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { UpdateBookingRequestDto } from './dtos/update-booking.dto';
import { CancelBookingByGuestDto } from './dtos/booking-cancelation.dto';
import { ChangeBookingStatusDto } from './dtos/change-booking-status.dto';
import { GuestReviewDto } from './dtos/guest-review.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_TAGS } from '../common/swagger';
import {
    CancelBookingByGuestSwagger,
    ChangeBookingStatusByHostSwagger,
    CheckAvailabilitySwagger,
    CreateBookingSwagger,
    GetAllBookingsSwagger,
    GetBookingByIdSwagger,
    GetMyBookingsSwagger,
    ReviewBookingSwagger,
    UpdateBookingByGuestSwagger,
} from './swagger';

@ApiTags(API_TAGS.BOOKINGS)
@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}

    @Public()
    @CheckAvailabilitySwagger()
    @Get('/check-availability')
    async checkAvailability(
        @Query() query: CheckAvailabilityDto,
    ): Promise<AvailabilityResponseDto> {
        return this.bookingsService.checkAvailability(query);
    }

    @AllowRoles(Roles.USER)
    @Post()
    @CreateBookingSwagger()
    @ApiBearerAuth()
    async requestBooking(
        @Body() body: BookingRequestDto,
        @CurrentUser() principal: Principal,
    ): Promise<BookingResponseDto> {
        return this.bookingsService.requestBooking(body, principal.user);
    }

    @AllowRoles(Roles.USER)
    @Get('/my-bookings')
    @GetMyBookingsSwagger()
    @ApiBearerAuth()
    async getMyBookings(
        @Query() query: GetAllBookingsDto,
        @CurrentUser() principal: Principal,
    ): Promise<PaginatedResult<BookingResponseDto>> {
        return this.bookingsService.getMyBookings(query, principal.user);
    }

    @AllowRoles(Roles.SYSTEM_ADMIN)
    @Get()
    @GetAllBookingsSwagger()
    @ApiBearerAuth()
    async getAllBookings(
        @Query() query: GetAllBookingsDto,
    ): Promise<PaginatedResult<BookingResponseDto>> {
        return this.bookingsService.getAllBookings(query);
    }

    @AllowRoles(Roles.USER, Roles.SYSTEM_ADMIN)
    @Get('/:id')
    @GetBookingByIdSwagger()
    @ApiBearerAuth()
    async getBookingById(
        @Param('id', new ParseMongoIdPipe()) id: string,
        @CurrentUser() principal: Principal,
    ): Promise<BookingResponseDto> {
        return this.bookingsService.getBookingById(id, principal);
    }

    @AllowRoles(Roles.USER)
    @Patch('/:id')
    @UpdateBookingByGuestSwagger()
    @ApiBearerAuth()
    async updateBookingByGuest(
        @Param('id', new ParseMongoIdPipe()) id: string,
        @Body() body: UpdateBookingRequestDto,
        @CurrentUser() principal: Principal,
    ): Promise<BookingResponseDto> {
        return this.bookingsService.updateBookingByGuest(
            id,
            body,
            principal.user,
        );
    }

    @AllowRoles(Roles.USER)
    @Patch('/:id/cancel')
    @CancelBookingByGuestSwagger()
    @ApiBearerAuth()
    async cancelBookingByGuest(
        @Param('id', new ParseMongoIdPipe()) id: string,
        @CurrentUser() principal: Principal,
        @Body() body: CancelBookingByGuestDto,
    ): Promise<BookingResponseDto> {
        return this.bookingsService.cancelBookingByGuest(
            id,
            principal.user,
            body,
        );
    }

    @AllowRoles(Roles.USER)
    @Patch('/:id/status')
    @ChangeBookingStatusByHostSwagger()
    @ApiBearerAuth()
    async changeBookingStatusByHost(
        @Param('id', new ParseMongoIdPipe()) id: string,
        @Body() body: ChangeBookingStatusDto,
        @CurrentUser() principal: Principal,
    ): Promise<BookingResponseDto> {
        return this.bookingsService.changeBookingStatusByHost(
            id,
            body,
            principal.user,
        );
    }

    @AllowRoles(Roles.USER)
    @Patch('/:id/submit-review')
    @ReviewBookingSwagger()
    @ApiBearerAuth()
    async reviewBooking(
        @Param('id', new ParseMongoIdPipe()) id: string,
        @Body() body: GuestReviewDto,
        @CurrentUser() principal: Principal,
    ): Promise<BookingResponseDto> {
        return this.bookingsService.reviewBooking(id, body, principal.user);
    }
}
