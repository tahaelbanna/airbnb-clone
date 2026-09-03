import { UnitValidationUseCase } from './unit-validation.usecase';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { plainToInstance } from 'class-transformer';
import { CurrentUserData } from 'src/auth/interfaces/principal.interface';
import { UnitsRepository } from '../repositories/unit.repository';
import { Injectable } from '@nestjs/common';
import { UpdateUnitDto } from '../dtos/update-unit.dto';
import { CheckUnitOwnerUseCase } from './check-unit-owner.usecase';
import { GetUnitUseCase } from './get-unit.usecase';

@Injectable()
export class UpdateUnitUseCase {
    constructor(
        private readonly unitValidationUseCase: UnitValidationUseCase,
        private readonly unitRepository: UnitsRepository,
        private readonly checkUnitOwnerUseCase: CheckUnitOwnerUseCase,
        private readonly getUnitUseCase: GetUnitUseCase,
    ) {}

    async execute(
        id: string,
        body: UpdateUnitDto,
        currentUser: CurrentUserData,
    ): Promise<UnitResponseDto> {
        const unit = await this.getUnitUseCase.execute({ _id: id });

        this.checkUnitOwnerUseCase.execute(
            currentUser,
            unit.unit_owner_id.toString(),
        );

        await this.unitValidationUseCase.execute(body);

        const updatedUnit = await this.unitRepository.findByIdAndUpdate(
            id,
            {
                $set: body,
            },
            { returnDocument: 'after' },
        );
        return plainToInstance(UnitResponseDto, updatedUnit.toObject());
    }
}
