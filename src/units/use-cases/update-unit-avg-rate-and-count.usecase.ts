import { Injectable } from '@nestjs/common';
import { UnitsRepository } from '../repositories/unit.repository';
import { UpdateUnitAvgRateAndCountDto } from '../dtos/update-unit-avg-rate-and-count.dto';
import { ClientSession } from 'mongoose';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class UpdateUnitAvgRateAndCountUsecase {
    constructor(
        private readonly unitsRepository: UnitsRepository,
        private readonly i18nService: I18nService,
    ) {}

    async execute(
        body: UpdateUnitAvgRateAndCountDto,
        session?: ClientSession,
    ): Promise<void> {
        const unit = await this.unitsRepository.findById(body.unit_id, session);
        if (!unit)
            throw new BadRequestException(
                this.i18nService.translate('units.UNIT_NOT_FOUND'),
            );

        await this.unitsRepository.findByIdAndUpdate(
            body.unit_id,
            {
                unit_avg_rate: body.unit_avg_rate,
                unit_reviews_count: body.unit_reviews_count,
            },
            {
                session,
            },
        );
    }
}
