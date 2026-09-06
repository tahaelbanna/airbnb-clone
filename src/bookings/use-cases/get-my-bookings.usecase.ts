import { Injectable } from '@nestjs/common';
import { GetAllBookingsDto } from '../dtos/get-all-bookings.dto';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { GetAllQueryBuilder } from '../query-builders/get-all-query-builder';
import { BookingRepository } from '../repositories/booking.repository';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from '../../common/data-access';
import { CurrentUserData } from 'src/auth/interfaces/principal.interface';

@Injectable()
export class GetMyBookingsUseCase {
    constructor(
        private readonly getAllQueryBuilder: GetAllQueryBuilder,
        private readonly bookingRepository: BookingRepository,
    ) {}
    async execute(
        query: GetAllBookingsDto,
        currentUser: CurrentUserData,
    ): Promise<PaginatedResult<BookingResponseDto>> {
        const matchQuery = this.getAllQueryBuilder.buildMatchQuery(query);
        const sortQuery = this.getAllQueryBuilder.buildSortQuery(query);

        if (query?.user_type === 'guest') {
            matchQuery.guest_id = currentUser._id.toString();
        } else if (query?.user_type === 'host') {
            matchQuery.host_id = currentUser._id.toString();
        } else {
            matchQuery.$or = [
                { guest_id: currentUser._id.toString() },
                { host_id: currentUser._id.toString() },
            ];
        }

        const result = await this.bookingRepository.findPaginated(matchQuery, {
            page: query?.page,
            limit: query?.limit,
            ignoreLimit: query?.ignoreLimit,
            sort: sortQuery,
            lean: true,
            populate: [
                { path: 'unit_id', select: 'unit_title' },
                { path: 'host_id', select: 'user_name user_email user_phone' },
                { path: 'guest_id', select: 'user_name user_email user_phone' },
            ],
        });
        return plainToInstance(PaginatedResult<BookingResponseDto>, result);
    }
}
