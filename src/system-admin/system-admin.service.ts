import { Injectable, OnModuleInit } from '@nestjs/common';
import { InitializeSystemAdminUseCase } from './use-cases/initialize-system-admin.usecase';
import { GetSystemAdminUseCase } from './use-cases/get-system-admin.usecase';
import { SystemAdminResponseDto } from './dto/system-admin-response.dto';
import { SystemAdmin } from './Schemas/system-admin.schema';
import { QueryFilter } from 'mongoose';

@Injectable()
export class SystemAdminService implements OnModuleInit {
    constructor(
        private readonly initializeSystemAdminUseCase: InitializeSystemAdminUseCase,
        private readonly getSystemAdminUseCase: GetSystemAdminUseCase,
    ) {}

    async onModuleInit(): Promise<void> {
        await this.initializeSystemAdminUseCase.execute();
    }

    async getSystemAdmin(
        query: QueryFilter<SystemAdmin>,
    ): Promise<SystemAdminResponseDto> {
        return this.getSystemAdminUseCase.execute(query);
    }
}
