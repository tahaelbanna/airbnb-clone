import { Injectable } from '@nestjs/common';
import { UnitFavouritesRepository } from '../repositories/unit-favourites.repository';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { CurrentUserData } from 'src/auth/interfaces/principal.interface';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';
import { CheckUserUseCase } from './check-user.usecase';

@Injectable()
export class AddUnitToFavouritesUseCase {
    constructor(
        private readonly unitFavouritesRepository: UnitFavouritesRepository,
        private readonly i18nService: I18nService,
        private readonly checkUserUseCase: CheckUserUseCase,
    ) {}
    async execute(unitId: string, currentUser: CurrentUserData): Promise<void> {
        await this.checkUserUseCase.execute(unitId, currentUser);
        const ifExists = await this.unitFavouritesRepository.findOne({
            unit_id: unitId,
            user_id: currentUser._id,
        });
        if (ifExists) {
            throw new BadRequestException(
                await this.i18nService.translate(
                    'favourites.THIS_UNIT_IS_ALREADY_IN_YOUR_FAVOURITES',
                ),
            );
        }
        await this.unitFavouritesRepository.create({
            unit_id: unitId,
            user_id: currentUser._id,
        });
    }
}
