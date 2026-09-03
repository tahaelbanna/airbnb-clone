import { UnitResponseDto } from '../dtos/unit-response.dto';
import { plainToInstance } from 'class-transformer';
import { UnitsRepository } from '../repositories/unit.repository';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/common/error-handling/custom-exceptions/not-found.exception';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';
import { QueryFilter } from 'mongoose';
import { Units } from '../schemas/units.schema';

@Injectable()
export class GetUnitUseCase {
    constructor(
        private readonly unitRepository: UnitsRepository,
        private readonly i18nService: I18nService,
    ) {}

    async execute(query: QueryFilter<Units>): Promise<UnitResponseDto> {
        const unit = await this.unitRepository.findOne(query);

        if (!unit)
            throw new NotFoundException(
                this.i18nService.translate('units.UNIT_NOT_FOUND'),
            );

        return plainToInstance(UnitResponseDto, unit);
    }
}
