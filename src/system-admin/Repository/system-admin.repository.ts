import { Injectable } from '@nestjs/common';
import { BaseRepository, ModelNames } from '../../common/data-access';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SystemAdmin } from '../Schemas/system-admin.schema';

@Injectable()
export class SystemAdminRepository extends BaseRepository<SystemAdmin> {
    constructor(
        @InjectModel(ModelNames.SYSTEM_ADMINS)
        private readonly systemAdminModel: Model<SystemAdmin>,
    ) {
        super(systemAdminModel);
    }
}
