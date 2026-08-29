import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Currency {
    @Prop({ required: true })
    currency_name: string;

    @Prop({ required: true })
    currency_code: string;

    @Prop({ default: false })
    isDeleted: boolean;

    @Prop({})
    deletedAt: Date;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
