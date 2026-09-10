import { PaginationDto } from '../../common/dtos/pagination.dto';
import { BookingStatus } from '../enums/booking-status.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortType } from '../../common/enums';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllBookingsDto extends PaginationDto {
    @ApiProperty({
        description: 'The status of the booking',
        enum: BookingStatus,
        example: BookingStatus.CONFIRMED,
        required: false,
    })
    @IsOptional()
    @IsEnum(BookingStatus)
    status?: BookingStatus;

    @ApiProperty({
        description: 'The ID of the unit',
        example: '507f1f77bcf86cd00892931b',
        required: false,
    })
    @IsOptional()
    @IsString()
    unit_id?: string;

    @ApiProperty({
        description: 'The ID of the host',
        example: '507f1f77bcf86cd00892931b',
        required: false,
    })
    @IsOptional()
    @IsString()
    host_id?: string;

    @ApiProperty({
        description: 'The check-out date',
        example: 1638451200,
        required: false,
    })
    @IsOptional()
    check_out?: Date | number;

    @ApiProperty({
        description: 'The check-in date',
        example: 1638451200,
        required: false,
    })
    @IsOptional()
    check_in?: Date | number;

    @ApiProperty({
        description: 'The type of sort for created at',
        enum: SortType,
        example: SortType.ASC,
        required: false,
    })
    @IsOptional()
    @IsEnum(SortType)
    sort_by_created_at?: SortType;

    @ApiProperty({
        description: 'The type of sort for total amount',
        enum: SortType,
        example: SortType.ASC,
        required: false,
    })
    @IsOptional()
    @IsEnum(SortType)
    sort_by_total_amount?: SortType;

    @ApiProperty({
        description: 'The type of user',
        enum: ['guest', 'host'],
        example: 'guest',
        required: false,
    })
    @IsOptional()
    user_type: 'guest' | 'host';
}
