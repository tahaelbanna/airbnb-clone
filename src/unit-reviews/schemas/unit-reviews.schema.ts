import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../common/data-access';
import { Types } from 'mongoose';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class UnitReviews {
    @Prop({ required: true, ref: ModelNames.BOOKINGS })
    booking_id: string;

    @Prop({ required: true, ref: ModelNames.UNITS })
    unit_id: string;

    @Prop({ required: true, type: Types.ObjectId, ref: ModelNames.USERS })
    guest_id: string;

    @Prop({ required: true })
    rating: number;

    @Prop()
    comment?: string;
}

export const UnitReviewsSchema = SchemaFactory.createForClass(UnitReviews);

UnitReviewsSchema.virtual('guest', {
    ref: ModelNames.USERS,
    localField: 'guest_id',
    foreignField: '_id',
    justOne: true,
});
