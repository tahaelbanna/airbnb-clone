import { PaginationDto } from '../../common/dtos/pagination.dto';
import { BookingStatus } from '../enums/booking-status.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortType } from '../../common/enums';

export class GetAllBookingsDto extends PaginationDto {
    @IsOptional()
    @IsEnum(BookingStatus)
    status?: BookingStatus;

    @IsOptional()
    @IsString()
    unit_id?: string;

    @IsOptional()
    check_in?: Date | number;

    @IsOptional()
    check_out?: Date | number;

    @IsOptional()
    @IsEnum(SortType)
    sort_by_created_at?: SortType;

    @IsOptional()
    @IsEnum(SortType)
    sort_by_total_amount?: SortType;

    @IsOptional()
    user_type: 'guest' | 'host';
}
