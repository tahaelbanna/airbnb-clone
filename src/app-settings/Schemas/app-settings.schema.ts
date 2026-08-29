import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class AppSettings {
    @Prop({ required: true, min: 0, max: 25, default: 0 })
    vat_rate: number;

    @Prop({ required: true, min: 0, default: 0 })
    min_price: number;
}

export const AppSettingsSchema = SchemaFactory.createForClass(AppSettings);
