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
import { GetAllUnitsByUserUseCase } from './use-cases/get-all-by-user.usecase';
import { SoftDeleteOneUnitUseCase } from './use-cases/delete-unit.usecase';
import { DeActivateUnitUseCase } from './use-cases/de-activate.usecase';
import { ActivateUnitUseCase } from './use-cases/activate-unit.usecase';
import { DeleteUnitPhotosUseCase } from './use-cases/delete-unit-photos.usecase';
import { DeleteUnitPhotosDto } from './dtos/delete-unit-photos.dto';
import { UpdateUnitPhotosUsecase } from './use-cases/update-unit-photos.usecase';
import { MulterFile } from 'src/files-upload/types/file-type.types';

@Injectable()
export class UnitsService {
    constructor(
        private readonly createUnitUseCase: CreateUnitUseCase,
        private readonly updateUnitUseCase: UpdateUnitUseCase,
        private readonly GetAllUnitsUseCase: GetAllUnitsUseCase,
        private readonly GetByIdUseCase: GetUnitByIdUseCase,
        private readonly getAllUnitsByUserUseCase: GetAllUnitsByUserUseCase,
        private readonly softDeleteOneUnitUseCase: SoftDeleteOneUnitUseCase,
        private readonly deActivateUnitUseCase: DeActivateUnitUseCase,
        private readonly activateUnitUseCase: ActivateUnitUseCase,
        private readonly deleteUnitPhotosUseCase: DeleteUnitPhotosUseCase,
        private readonly updateUnitPhotosUsecase: UpdateUnitPhotosUsecase,
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

    async GetAllUnitsByUser(
        query: GetAllUnitsDto,
        currentUser: CurrentUserData,
    ): Promise<PaginatedResult<UnitResponseDto>> {
        return this.getAllUnitsByUserUseCase.execute(query, currentUser);
    }

    async GetById(id: string): Promise<UnitResponseDto> {
        return this.GetByIdUseCase.execute(id);
    }

    async SoftDeleteOneUnit(
        id: string,
        currentUser: CurrentUserData,
    ): Promise<void> {
        return this.softDeleteOneUnitUseCase.execute(id, currentUser);
    }

    async DeActivateUnit(
        id: string,
        currentUser: CurrentUserData,
    ): Promise<UnitResponseDto> {
        return this.deActivateUnitUseCase.execute(id, currentUser);
    }

    async ActivateUnit(
        id: string,
        currentUser: CurrentUserData,
    ): Promise<UnitResponseDto> {
        return this.activateUnitUseCase.execute(id, currentUser);
    }

    async deleteUnitPhotos(
        id: string,
        user: CurrentUserData,
        body: DeleteUnitPhotosDto,
    ): Promise<void> {
        await this.deleteUnitPhotosUseCase.execute(id, user, body);
    }

    async updateUnitPhotos(
        id: string,
        user: CurrentUserData,
        photos: MulterFile[],
    ): Promise<UnitResponseDto> {
        return this.updateUnitPhotosUsecase.execute(id, user, photos);
    }
}
