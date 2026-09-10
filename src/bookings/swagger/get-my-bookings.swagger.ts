import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { BookingStatus } from '../enums/booking-status.enum';
import { SortType } from '../../common/enums';

export function GetMyBookingsSwagger() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get my bookings',
            description:
                'Retrieve a paginated list of bookings for the authenticated user.',
        }),
        ApiQuery({ name: 'page', required: false, type: Number }),
        ApiQuery({ name: 'limit', required: false, type: Number }),
        ApiQuery({ name: 'ignoreLimit', required: false, type: Boolean }),
        ApiQuery({ name: 'status', required: false, enum: BookingStatus }),
        ApiQuery({ name: 'unit', required: false, type: String }),
        ApiQuery({ name: 'checkIn', required: false, type: String }),
        ApiQuery({ name: 'checkOut', required: false, type: String }),
        ApiQuery({ name: 'sortByCreatedAt', required: false, enum: SortType }),
        ApiQuery({
            name: 'sortByTotalAmount',
            required: false,
            enum: SortType,
        }),
        ApiQuery({
            name: 'userType',
            required: false,
            enum: ['guest', 'host'],
        }),
        ApiResponse({ status: 200, type: [BookingResponseDto] }),
        ApiResponse({ status: 500, description: 'Internal server error' }),
    );
}
