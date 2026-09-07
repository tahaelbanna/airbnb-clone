import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class GuestReview {
    @Prop({ min: 1, max: 5 })
    rating: number;

    @Prop({ minlength: 5, maxlength: 1000 })
    comment: string;
}
