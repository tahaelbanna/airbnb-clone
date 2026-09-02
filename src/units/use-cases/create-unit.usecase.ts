import { CreateUnitDto } from '../dtos/create-unit.dto';
import { UnitValidationUseCase } from './unit-validation.usecase';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { plainToInstance } from 'class-transformer';
import { CurrentUserData } from 'src/auth/interfaces/principal.interface';
import { UnitsRepository } from '../repositories/unit.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUnitUseCase {
    constructor(
        private readonly unitValidationUseCase: UnitValidationUseCase,
        private readonly unitRepository: UnitsRepository,
    ) {}

    async execute(
        body: CreateUnitDto,
        currentUser: CurrentUserData,
    ): Promise<UnitResponseDto> {
        await this.unitValidationUseCase.execute(body);
        const unit = await this.unitRepository.create({
            ...body,
            unit_owner_id: currentUser._id,
        });
        return plainToInstance(UnitResponseDto, unit.toObject());
    }
}
