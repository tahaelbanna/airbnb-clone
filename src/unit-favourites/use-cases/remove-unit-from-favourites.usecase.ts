import { UnitFavouritesRepository } from '../repositories/unit-favourites.repository';
import { Injectable } from '@nestjs/common';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { CheckUserUseCase } from './check-user.usecase';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class RemoveUnitFavoriteUseCase {
    constructor(
        private readonly unitFavouritesRepository: UnitFavouritesRepository,
        private readonly checkUserUseCase: CheckUserUseCase,
        private readonly i18nService: I18nService,
    ) {}

    async execute(unitId: string, user: CurrentUserData): Promise<void> {
        await this.checkUserUseCase.execute(unitId, user);
        const toBeDeleted =
            await this.unitFavouritesRepository.findOneAndDelete({
                unit_id: unitId,
                user_id: user._id.toString(),
            });

        if (!toBeDeleted)
            throw new BadRequestException(
                this.i18nService.translate(
                    'favourites.THIS_UNIT_IS_NOT_IN_YOUR_FAVOURITES',
                ),
            );
    }
}
