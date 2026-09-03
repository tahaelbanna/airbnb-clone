import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../common/data-access';

@Schema({ timestamps: true })
export class Units {
    @Prop({ required: true })
    unit_title: string;

    @Prop({ required: true })
    unit_description: string;

    @Prop({ required: true })
    unit_address: string;

    @Prop({ required: true })
    unit_photos: string[];

    @Prop({ required: true })
    unit_cost_per_night: number;

    @Prop({ required: true, ref: ModelNames.COUNTRIES })
    unit_country_id: string;

    @Prop({ required: true, ref: ModelNames.CITIES })
    unit_city_id: string;

    @Prop({ required: true, ref: ModelNames.UNIT_CATEGORIES })
    unit_category_id: string;

    @Prop({ required: true, ref: ModelNames.USERS })
    unit_owner_id: string;

    @Prop({ required: true })
    unit_rooms_count: number;

    @Prop({ required: true })
    unit_adults_count: number;

    @Prop({ required: true })
    unit_kids_count: number;

    @Prop({ required: true, default: false })
    has_internet_service: boolean;

    @Prop({ required: true, default: false })
    has_kitchen: boolean;

    @Prop({ required: true, default: false })
    has_private_garage: boolean;

    @Prop({ required: true, default: true })
    availability: boolean;

    @Prop({ required: true, default: true })
    isActive: boolean;

    @Prop({ default: false })
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;
}

export const UnitSchema = SchemaFactory.createForClass(Units);
