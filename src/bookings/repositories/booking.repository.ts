import { Injectable } from '@nestjs/common';
import { BaseRepository, ModelNames } from '../../common/data-access';
import { Booking } from '../schemas/booking.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BookingRepository extends BaseRepository<Booking> {
    constructor(
        @InjectModel(ModelNames.BOOKINGS)
        private readonly bookingModel: Model<Booking>,
    ) {
        super(bookingModel);
    }
}
