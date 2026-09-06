import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { UnitsModule } from '../units/units.module';
import { AppSettingsModule } from 'src/app-settings/app-settings.module';
import { BookingSchema } from './schemas/booking.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingValidationUseCase } from './use-cases/booking-validation.usecase';
import { BookingCalculationUseCase } from './use-cases/booking-calculation.usecase';
import { ModelNames } from 'src/common/data-access/model-names.enum';
import { CheckAvailabilityUseCase } from './use-cases/check-availability.usecase';
import { BookingRepository } from './repositories/booking.repository';

@Module({
    providers: [
        BookingsService,
        BookingCalculationUseCase,
        BookingValidationUseCase,
        CheckAvailabilityUseCase,
        BookingRepository,
    ],
    controllers: [BookingsController],
    imports: [
        UnitsModule,
        AppSettingsModule,
        MongooseModule.forFeature([
            { name: ModelNames.BOOKINGS, schema: BookingSchema },
        ]),
    ],
})
export class BookingsModule {}
