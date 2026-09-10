import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Otp extends Document {
    @Prop({ required: true, index: true })
    email: string;

    @Prop({ required: true })
    code: string;

    @Prop({ required: true })
    expiresAt: Date;

    @Prop({ required: true, default: false })
    isVerified: boolean;

    updatedAt?: Date;

    createdAt?: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
