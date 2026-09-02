import { Injectable } from '@nestjs/common';
import { CreateUnitUseCase } from './use-cases/create-unit.usecase';
import { UnitResponseDto } from './dtos/unit-response.dto';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { CurrentUserData } from 'src/auth/interfaces/principal.interface';

@Injectable()
export class UnitsService {
    constructor(private readonly createUnitUseCase: CreateUnitUseCase) {
        console.log('CREATE UNIT USE CASE IS:', this.createUnitUseCase);
    }
    async createUnit(
        body: CreateUnitDto,
        currentUser: CurrentUserData,
    ): Promise<UnitResponseDto> {
        return this.createUnitUseCase.execute(body, currentUser);
    }
}
