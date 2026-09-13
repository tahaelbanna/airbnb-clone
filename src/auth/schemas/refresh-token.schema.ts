import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Roles } from '../../common/constants/roles.constans';
@Schema({ timestamps: true })
export class RefreshToken {
    @Prop({ required: true })
    userId: string;
    @Prop({ required: true, enum: Roles })
    role: string;
    @Prop({ required: true })
    refreshToken: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
