import { Injectable } from '@nestjs/common';
import { UnitsRepository } from '../repositories/unit.repository';
import { GetUnitUseCase } from './get-unit.usecase';
import { CurrentUserData } from 'src/auth/interfaces/principal.interface';
import { CheckUnitOwnerUseCase } from './check-unit-owner.usecase';
@Injectable()
export class SoftDeleteOneUnitUseCase {
    constructor(
        private readonly unitsRepository: UnitsRepository,
        private readonly getUnitUseCase: GetUnitUseCase,
        private readonly checkUnitOwnerUseCase: CheckUnitOwnerUseCase,
    ) {}

    async execute(id: string, currentUser: CurrentUserData): Promise<void> {
        const existingUnit = await this.getUnitUseCase.execute({ _id: id });
        this.checkUnitOwnerUseCase.execute(
            currentUser,
            existingUnit.unit_owner_id,
        );
        await this.unitsRepository.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { returnDocument: 'after' },
        );
    }
}
