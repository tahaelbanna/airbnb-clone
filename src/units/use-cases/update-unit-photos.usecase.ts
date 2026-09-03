import { Injectable } from '@nestjs/common';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { UpdateUnitPhotosDto } from '../dtos/update-unit-photos.dto';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { UnitsRepository } from '../repositories/unit.repository';
import { CheckUnitOwnerUseCase } from './check-unit-owner.usecase';
import { GetUnitUseCase } from './get-unit.usecase';
import { FilesUploadService } from '../../files-upload/files-upload.service';
import { plainToInstance } from 'class-transformer';
import { MulterFile } from '../../files-upload/types/file-type.types';

@Injectable()
export class UpdateUnitPhotosUsecase {
    constructor(
        private readonly unitsRepository: UnitsRepository,
        private readonly checkUnitOwnerUseCase: CheckUnitOwnerUseCase,
        private readonly getUnitUseCase: GetUnitUseCase,
        private readonly filesUploadService: FilesUploadService,
    ) {}

    async execute(
        id: string,
        currentUser: CurrentUserData,
        photos: MulterFile[],
    ): Promise<UnitResponseDto> {
        const body: UpdateUnitPhotosDto = {};
        const unit = await this.getUnitUseCase.execute({ _id: id });
        this.checkUnitOwnerUseCase.execute(
            currentUser,
            unit.unit_owner_id.toString(),
        );

        body.unit_photos =
            await this.filesUploadService.uploadMultipleFiles(photos);

        const updatedUnit = await this.unitsRepository.findByIdAndUpdate(
            id,
            { $addToSet: { unit_photos: { $each: body.unit_photos } } },
            { returnDocument: 'after', lean: true },
        );

        return plainToInstance(UnitResponseDto, updatedUnit);
    }
}
