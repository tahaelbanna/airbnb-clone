import { applyDecorators } from '@nestjs/common';
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
} from '@nestjs/swagger';
import { CheckAvailabilityDto } from '../dtos/check-availability.dto';
import { BookingRequestDto } from '../dtos/booking-request.dto';
import { GetAllBookingsDto } from '../dtos/get-all-bookings.dto';
import { UpdateBookingRequestDto } from '../dtos/update-booking.dto';
import { CancelBookingByGuestDto } from '../dtos/booking-cancelation.dto';
import { ChangeBookingStatusDto } from '../dtos/change-booking-status.dto';
import { GuestReviewDto } from '../dtos/guest-review.dto';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { AvailabilityResponseDto } from '../dtos/availability-response.dto';
const op = (summary: string, ...decorators: MethodDecorator[]) =>
    applyDecorators(
        ApiOperation({ summary }),
        ...decorators,
        ApiResponse({ status: 200, type: BookingResponseDto }),
    );
export const CheckAvailabilitySwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Check booking availability' }),
        ApiQuery({ type: CheckAvailabilityDto }),
        ApiResponse({ status: 200, type: AvailabilityResponseDto }),
    );
export const RequestBookingSwagger = () =>
    op('Request a booking', ApiBody({ type: BookingRequestDto }));
export const GetMyBookingsSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Get my bookings' }),
        ApiQuery({ type: GetAllBookingsDto }),
        ApiResponse({ status: 200 }),
    );
export const GetAllBookingsSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Get all bookings' }),
        ApiQuery({ type: GetAllBookingsDto }),
        ApiResponse({ status: 200 }),
    );
export const GetBookingByIdSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Get booking by ID' }),
        ApiParam({ name: 'id' }),
        ApiResponse({ status: 200, type: BookingResponseDto }),
    );
export const UpdateBookingSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Update booking' }),
        ApiParam({ name: 'id' }),
        ApiBody({ type: UpdateBookingRequestDto }),
        ApiResponse({ status: 200, type: BookingResponseDto }),
    );
export const CancelBookingSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Cancel booking' }),
        ApiParam({ name: 'id' }),
        ApiBody({ type: CancelBookingByGuestDto }),
        ApiResponse({ status: 200, type: BookingResponseDto }),
    );
export const ChangeBookingStatusSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Change booking status' }),
        ApiParam({ name: 'id' }),
        ApiBody({ type: ChangeBookingStatusDto }),
        ApiResponse({ status: 200, type: BookingResponseDto }),
    );
export const ReviewBookingSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Submit booking review' }),
        ApiParam({ name: 'id' }),
        ApiBody({ type: GuestReviewDto }),
        ApiResponse({ status: 200, type: BookingResponseDto }),
    );
