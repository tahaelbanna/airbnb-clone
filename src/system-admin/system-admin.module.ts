import { Module } from '@nestjs/common';
import { SystemAdminService } from './system-admin.service';
import { SystemAdminSchema } from './Schemas/system-admin.schema';
import { ModelNames } from 'src/common/data-access/model-names.enum';
import { MongooseModule } from '@nestjs/mongoose';
import { GetSystemAdminUseCase } from './use-cases/get-system-admin.usecase';
import { InitializeSystemAdminUseCase } from './use-cases/initialize-system-admin.usecase';
import { SystemAdminRepository } from './Repository/system-admin.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ModelNames.SYSTEM_ADMINS, schema: SystemAdminSchema },
        ]),
    ],
    providers: [
        SystemAdminService,
        GetSystemAdminUseCase,
        InitializeSystemAdminUseCase,
        SystemAdminRepository,
    ],
    exports: [SystemAdminService],
})
export class SystemAdminModule {}
