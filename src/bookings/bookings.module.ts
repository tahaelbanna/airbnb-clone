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
import { BookingRequestUseCase } from './use-cases/booking-request.usecase';
import { GetAllQueryBuilder } from './query-builders/get-all-query-builder';
import { GetMyBookingsUseCase } from './use-cases/get-my-bookings.usecase';
import { GetAllBookingsUseCase } from './use-cases/get-all-bookings.usecase';
import { CheckCurrentUserUseCase } from './use-cases/check-current-user.usecase';
import { GetBookingByIdUseCase } from './use-cases/get-booking-by-id.usecase';
import { UpdateBookingByGuestUsecase } from './use-cases/update-booking-by-guest.usecase';
import { CancelBookingByGuestUseCase } from './use-cases/cancel-booking-by-guest.usecase';
import { DetermineUserTypeUseCase } from './use-cases/determine-user-type.usecase';
import { ChangeBookingStatusByHostUseCase } from './use-cases/change-booking-status-by-host.usecase';
import { ReviewBookingUseCase } from './use-cases/review-booking.usecase';
import { UnitReviewsModule } from '../unit-reviews/unit-reviews.module';

@Module({
    providers: [
        BookingsService,
        BookingCalculationUseCase,
        BookingValidationUseCase,
        CheckAvailabilityUseCase,
        BookingRepository,
        BookingRequestUseCase,
        GetAllQueryBuilder,
        GetMyBookingsUseCase,
        GetAllBookingsUseCase,
        CheckCurrentUserUseCase,
        GetBookingByIdUseCase,
        UpdateBookingByGuestUsecase,
        CancelBookingByGuestUseCase,
        DetermineUserTypeUseCase,
        ChangeBookingStatusByHostUseCase,
        ReviewBookingUseCase,
    ],
    controllers: [BookingsController],
    imports: [
        UnitsModule,
        AppSettingsModule,
        MongooseModule.forFeature([
            { name: ModelNames.BOOKINGS, schema: BookingSchema },
        ]),
        UnitReviewsModule,
    ],
})
export class BookingsModule {}
