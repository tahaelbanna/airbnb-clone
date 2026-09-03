import { Injectable } from '@nestjs/common';
import { UnitsRepository } from '../repositories/unit.repository';
import { GetUnitUseCase } from './get-unit.usecase';
import { CurrentUserData } from 'src/auth/interfaces/principal.interface';
import { CheckUnitOwnerUseCase } from './check-unit-owner.usecase';
import { plainToInstance } from 'class-transformer';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { I18nService } from 'nestjs-i18n';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';

@Injectable()
export class DeActivateUnitUseCase {
    constructor(
        private readonly unitsRepository: UnitsRepository,
        private readonly getUnitUseCase: GetUnitUseCase,
        private readonly checkUnitOwnerUseCase: CheckUnitOwnerUseCase,
        private readonly i18nService: I18nService,
    ) {}

    async execute(
        id: string,
        currentUser: CurrentUserData,
    ): Promise<UnitResponseDto> {
        const existingUnit = await this.getUnitUseCase.execute({
            _id: id,
            isActive: true,
        });

        if (existingUnit.isDeleted) {
            throw new BadRequestException(
                this.i18nService.translate('unit.UNIT_ALREADY_DELETED'),
            );
        }

        this.checkUnitOwnerUseCase.execute(
            currentUser,
            existingUnit.unit_owner_id,
        );

        const result = await this.unitsRepository.findByIdAndUpdate(
            id,
            { isActive: false },
            { returnDocument: 'after', lean: true },
        );

        return plainToInstance(UnitResponseDto, result);
    }
}
