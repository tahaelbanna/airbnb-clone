import { Injectable } from '@nestjs/common';
import { CreateUnitUseCase } from './use-cases/create-unit.usecase';
import { UnitResponseDto } from './dtos/unit-response.dto';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { CurrentUserData } from 'src/auth/interfaces/principal.interface';
import { UpdateUnitUseCase } from './use-cases/update-unit.usecase';
import { UpdateUnitDto } from './dtos/update-unit.dto';
import { GetAllUnitsDto } from './dtos/get-all.usecase.dto';
import { GetUnitByIdUseCase } from './use-cases/git-unit-by-id.usecase';
import { GetAllUnitsUseCase } from './use-cases/get-all-units.usecase';
import { PaginatedResult } from 'src/common/data-access/base-repository';
@Injectable()
export class UnitsService {
    constructor(
        private readonly createUnitUseCase: CreateUnitUseCase,
        private readonly updateUnitUseCase: UpdateUnitUseCase,
        private readonly GetAllUnitsUseCase: GetAllUnitsUseCase,
        private readonly GetByIdUseCase: GetUnitByIdUseCase,
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

    async GetAll(
        query: GetAllUnitsDto,
    ): Promise<PaginatedResult<UnitResponseDto>> {
        return this.GetAllUnitsUseCase.execute(query);
    }

    async GetById(id: string): Promise<UnitResponseDto> {
        return this.GetByIdUseCase.execute(id);
    }
}
