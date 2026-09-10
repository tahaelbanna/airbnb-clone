import { Injectable } from '@nestjs/common';
import { GetAllBookingsDto } from '../dtos/get-all-bookings.dto';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { GetAllQueryBuilder } from '../query-builders/get-all-query-builder';
import { BookingRepository } from '../repositories/booking.repository';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from '../../common/data-access';

@Injectable()
export class GetAllBookingsUseCase {
    constructor(
        private readonly getAllQueryBuilder: GetAllQueryBuilder,
        private readonly bookingRepository: BookingRepository,
    ) {}
    async execute(
        query: GetAllBookingsDto,
    ): Promise<PaginatedResult<BookingResponseDto>> {
        const matchQuery = this.getAllQueryBuilder.buildMatchQuery(query);
        const sortQuery = this.getAllQueryBuilder.buildSortQuery(query);
        const result = await this.bookingRepository.findPaginated(matchQuery, {
            page: query?.page,
            limit: query?.limit,
            ignoreLimit: query?.ignoreLimit,
            sort: sortQuery,
            lean: true,
            populate: [
                {
                    path: 'unit_id',
                    select: 'unit_title unit_photos unit_address',
                },
                { path: 'host_id', select: 'name email phone' },
                { path: 'guest_id', select: 'name email phone' },
            ],
        });
        return plainToInstance(PaginatedResult<BookingResponseDto>, result);
    }
}
