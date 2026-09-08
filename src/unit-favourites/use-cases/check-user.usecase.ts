import { Injectable } from '@nestjs/common';
import { UnitsService } from 'src/units/units.service';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { CurrentUserData } from 'src/auth/interfaces/principal.interface';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class CheckUserUseCase {
    constructor(
        private readonly unitsService: UnitsService,
        private readonly i18nService: I18nService,
    ) {}
    async execute(unitId: string, currentUser: CurrentUserData): Promise<void> {
        const unit = await this.unitsService.GetById(unitId);
        if (unit.unit_owner_id.toString() === currentUser._id.toString()) {
            throw new BadRequestException(
                await this.i18nService.translate(
                    'favourites.YOUR_UNIT_CANNOT_BE_ADDED_TO_FAVOURITES',
                ),
            );
        }
    }
}
