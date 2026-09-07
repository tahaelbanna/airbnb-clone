import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../common/data-access';

@Schema({ timestamps: true })
export class UnitReviews {
    @Prop({ required: true, ref: ModelNames.BOOKINGS })
    booking_id: string;

    @Prop({ required: true, ref: ModelNames.UNITS })
    unit_id: string;

    @Prop({ required: true, ref: ModelNames.USERS })
    guest_id: string;

    @Prop({ required: true })
    rating: number;

    @Prop()
    comment?: string;
}

export const UnitReviewsSchema = SchemaFactory.createForClass(UnitReviews);
