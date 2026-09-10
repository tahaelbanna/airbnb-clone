import { Injectable } from '@nestjs/common';
import { BaseRepository, ModelNames } from '../../common/data-access';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp } from '../schemas/otp.schema';

@Injectable()
export class OtpRepository extends BaseRepository<Otp> {
    constructor(
        @InjectModel(ModelNames.OTP)
        private readonly otpModel: Model<Otp>,
    ) {
        super(otpModel);
    }
}
