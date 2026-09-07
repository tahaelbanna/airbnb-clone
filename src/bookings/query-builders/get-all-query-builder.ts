import { Injectable } from '@nestjs/common';
import { GetAllBookingsDto } from '../dtos/get-all-bookings.dto';
import { QueryFilter } from 'mongoose';
import { Booking } from '../schemas/booking.schema';
import dayjs from 'dayjs';
import { SortType } from '../../common/enums';

@Injectable()
export class GetAllQueryBuilder {
    buildMatchQuery(query: GetAllBookingsDto): QueryFilter<Booking> {
        const matchQuery: QueryFilter<Booking> = {};
        if (query?.unit_id) matchQuery.unit_id = query.unit_id;
        if (query?.status) matchQuery.status = query.status;

        if (query?.check_in)
            matchQuery.check_in = { $gte: dayjs(query.check_in).toDate() };
        if (query?.check_out)
            matchQuery.check_out = { $lte: dayjs(query.check_out).toDate() };

        return matchQuery;
    }

    buildSortQuery(query: GetAllBookingsDto): QueryFilter<Booking> {
        const sortQuery: QueryFilter<Booking> = { createdAt: -1 };
        sortQuery.createdAt =
            query?.sort_by_created_at === SortType.ASC ? 1 : -1;

        if (query?.sort_by_total_amount)
            sortQuery.totalAmount =
                query?.sort_by_total_amount === SortType.ASC ? 1 : -1;

        return sortQuery;
    }
}
