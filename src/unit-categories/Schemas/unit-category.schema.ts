import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UnitCategories {
    @Prop({ required: true })
    unit_categories_name: string;

    @Prop({ required: true })
    icon: string;

    @Prop({ default: false })
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;
}

export const UnitCategoriesSchema =
    SchemaFactory.createForClass(UnitCategories);
