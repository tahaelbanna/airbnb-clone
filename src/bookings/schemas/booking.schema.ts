import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../common/data-access';
import { BookingStatus } from '../enums/booking-status.enum';

@Schema({ timestamps: true })
export class Booking {
    @Prop({ required: true, ref: ModelNames.UNITS })
    unit_id: string;

    @Prop({ required: true, ref: ModelNames.USERS })
    guest_id: string;

    @Prop({ required: true, ref: ModelNames.USERS })
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
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
