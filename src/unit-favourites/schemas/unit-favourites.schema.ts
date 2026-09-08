import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/data-access/model-names.enum';

@Schema({ timestamps: true })
export class UnitFavourites {
    @Prop({ required: true, ref: ModelNames.UNITS })
    unit_id: string;

    @Prop({ required: true, ref: ModelNames.USERS })
    user_id: string;
}

export const UnitFavouritesSchema =
    SchemaFactory.createForClass(UnitFavourites);

UnitFavouritesSchema.index({ unit_id: 1, user_id: 1 }, { unique: true });
