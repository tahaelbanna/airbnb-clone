import { Injectable } from '@nestjs/common';
import { CreateUnitUseCase } from './use-cases/create-unit.usecase';
import { UnitResponseDto } from './dtos/unit-response.dto';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { CurrentUserData } from 'src/auth/interfaces/principal.interface';
import { UpdateUnitUseCase } from './use-cases/update-unit.usecase';
import { UpdateUnitDto } from './dtos/update-unit.dto';
@Injectable()
export class UnitsService {
    constructor(
        private readonly createUnitUseCase: CreateUnitUseCase,
        private readonly updateUnitUseCase: UpdateUnitUseCase,
    ) {}
    async create(
        body: CreateUnitDto,
        currentUser: CurrentUserData,
    ): Promise<UnitResponseDto> {
        return this.createUnitUseCase.execute(body, currentUser);
    }

    async update(
        id: string,
        body: UpdateUnitDto,
        currentUser: CurrentUserData,
    ): Promise<UnitResponseDto> {
        return this.updateUnitUseCase.execute(id, body, currentUser);
    }
}
