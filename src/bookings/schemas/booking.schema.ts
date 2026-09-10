import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ModelNames } from '../../common/data-access';
import { BookingStatus } from '../enums/booking-status.enum';
import { BookingCancelledBy } from '../enums/booking-cancelled-by.enum';
import { GuestReview } from './subdocument/guest-review.schema';
@Schema({ timestamps: true })
export class Booking {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: ModelNames.UNITS,
    })
    unit_id: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: ModelNames.USERS,
    })
    guest_id: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: ModelNames.USERS,
    })
    host_id: string;

    @Prop({ required: true, type: Date })
    check_in: number | Date;

    @Prop({ required: true, type: Date })
    check_out: number | Date;

    @Prop({ required: true })
    nights_count: number;

    @Prop({ required: true })
    price_per_night: number;

    @Prop({ required: true })
    booking_amount: number;

    @Prop({ required: true })
    vat: number;

    @Prop({ required: true })
    vat_amount: number;

    @Prop({ required: true })
    total_amount: number;

    @Prop()
    adults_count?: number;

    @Prop()
    kids_count?: number;

    @Prop()
    notes?: string;

    @Prop({ type: String, enum: BookingStatus, default: BookingStatus.PENDING })
    status: BookingStatus;

    @Prop()
    cancellation_reason?: string;

    @Prop()
    cancellation_date?: Date;

    @Prop({ type: String, enum: BookingCancelledBy })
    cancelled_by?: BookingCancelledBy;

    @Prop()
    guest_review?: GuestReview;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
