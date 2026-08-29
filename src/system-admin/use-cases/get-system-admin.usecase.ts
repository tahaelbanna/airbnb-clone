import { Injectable } from '@nestjs/common';
import { SystemAdminRepository } from '../Repository/system-admin.repository';
import { QueryFilter } from 'mongoose';
import { SystemAdmin } from '../Schemas/system-admin.schema';
import { SystemAdminResponseDto } from '../dto/system-admin-response.dto';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class GetSystemAdminUseCase {
    constructor(
        private readonly systemAdminRepository: SystemAdminRepository,
    ) {}

    async execute(
        query: QueryFilter<SystemAdmin>,
    ): Promise<SystemAdminResponseDto> {
        const systemAdmin = await this.systemAdminRepository.findOne(query);
        return plainToInstance(SystemAdminResponseDto, systemAdmin);
    }
}
