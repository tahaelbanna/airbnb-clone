import { Injectable } from '@nestjs/common';
import { BaseRepository, ModelNames } from '../../common/data-access';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForgetPassword } from '../schemas/forget-password.schema';

@Injectable()
export class ForgetPasswordRepository extends BaseRepository<ForgetPassword> {
    constructor(
        @InjectModel(ModelNames.FORGET_PASSWORD)
        private readonly forgetPasswordModel: Model<ForgetPassword>,
    ) {
        super(forgetPasswordModel);
    }
}
