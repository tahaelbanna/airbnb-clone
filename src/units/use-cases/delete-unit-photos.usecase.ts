import { Injectable } from '@nestjs/common';
import { FilesUploadService } from '../../files-upload/files-upload.service';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { DeleteUnitPhotosDto } from '../dtos/delete-unit-photos.dto';
import { CheckUnitOwnerUseCase } from './check-unit-owner.usecase';
import { GetUnitUseCase } from './get-unit.usecase';
import { UnitsRepository } from '../repositories/unit.repository';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class DeleteUnitPhotosUseCase {
    constructor(
        private readonly unitsRepository: UnitsRepository,
        private readonly filesUploadService: FilesUploadService,
        private readonly checkUnitOwnerUseCase: CheckUnitOwnerUseCase,
        private readonly getUnitUseCase: GetUnitUseCase,
        private readonly i18nService: I18nService,
    ) {}

    async execute(
        unitId: string,
        currentUser: CurrentUserData,
        body: DeleteUnitPhotosDto,
    ): Promise<void> {
        const unit = await this.getUnitUseCase.execute({ _id: unitId });
        this.checkUnitOwnerUseCase.execute(
            currentUser,
            unit.unit_owner_id.toString(),
        );

        if (!body.unit_photos?.length)
            throw new BadRequestException(
                this.i18nService.translate('units.NO_PHOTOS_TO_DELETE'),
            );

        const imagesToDelete = body.unit_photos.filter((photo) =>
            unit.unit_photos.includes(photo),
        );

        await this.unitsRepository.findByIdAndUpdate(
            unitId,
            { $pull: { unit_photos: { $in: imagesToDelete } } },
            { returnDocument: 'after' },
        );

        await this.filesUploadService.deleteFileByUrl(imagesToDelete);
    }
}
