import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../common/data-access';

@Schema({ timestamps: true })
export class City {
    @Prop({ required: true, ref: ModelNames.COUNTRIES })
    country_id: string;

    @Prop({ required: true })
    city_name: string;

    @Prop({ default: false })
    isDeleted: boolean;

    @Prop({})
    deletedAt: Date;
}

export const CitySchema = SchemaFactory.createForClass(City);
