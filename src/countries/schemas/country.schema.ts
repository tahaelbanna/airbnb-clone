import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Country {
    @Prop({ required: true })
    country_name: string;

    @Prop({ required: true })
    country_code: string;

    @Prop({ default: false })
    isDeleted: boolean;

    @Prop({})
    deletedAt: Date;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
