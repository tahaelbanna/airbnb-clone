import { CreateUnitDto } from '../dtos/create-unit.dto';
import { UnitValidationUseCase } from './unit-validation.usecase';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { plainToInstance } from 'class-transformer';
import { CurrentUserData } from 'src/auth/interfaces/principal.interface';
import { UnitsRepository } from '../repositories/unit.repository';
import { Injectable } from '@nestjs/common';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class CreateUnitUseCase {
    constructor(
        private readonly unitValidationUseCase: UnitValidationUseCase,
        private readonly unitRepository: UnitsRepository,
        private readonly i18nService: I18nService,
    ) {}

    async execute(
        body: CreateUnitDto,
        currentUser: CurrentUserData,
    ): Promise<UnitResponseDto> {
        await this.unitValidationUseCase.execute(body);
        try {
            const unit = await this.unitRepository.create({
                ...body,
                unit_owner_id: currentUser._id,
            });
            return plainToInstance(UnitResponseDto, unit.toObject());
        } catch {
            throw new BadRequestException(
                this.i18nService.translate('units.UNIT_ALREADY_EXISTS'),
            );
        }
    }
}
