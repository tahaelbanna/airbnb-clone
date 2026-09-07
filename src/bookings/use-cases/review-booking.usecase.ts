import { GuestReviewDto } from '../dtos/guest-review.dto';
import { Injectable } from '@nestjs/common';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { BookingRepository } from '../repositories/booking.repository';
import { DetermineUserTypeUseCase } from './determine-user-type.usecase';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { BookingStatus } from '../enums/booking-status.enum';
import { UnitReviewsService } from '../../unit-reviews/unit-reviews.service';
import { UnitsService } from '../../units/units.service';
import { plainToInstance } from 'class-transformer';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class ReviewBookingUseCase {
    constructor(
        private readonly bookingRepository: BookingRepository,
        private readonly determineUserTypeUseCase: DetermineUserTypeUseCase,
        private readonly unitReviewsService: UnitReviewsService,
        private readonly unitsService: UnitsService,
        private readonly i18nService: I18nService,

        @InjectConnection()
        private readonly connection: Connection,
    ) {}
    async execute(
        id: string,
        body: GuestReviewDto,
        user: CurrentUserData,
    ): Promise<BookingResponseDto> {
        const booking = await this.bookingRepository.findById(id);
        if (!booking) {
            throw new BadRequestException(
                this.i18nService.translate('bookings.BOOKING_NOT_FOUND'),
            );
        }

        this.determineUserTypeUseCase.checkIfGuest(
            booking.guest_id.toString(),
            user._id.toString(),
        );

        if (booking.status !== BookingStatus.COMPLETED) {
            throw new BadRequestException(
                this.i18nService.translate('bookings.BOOKING_NOT_COMPLETED'),
            );
        }

        if (booking?.guest_review) {
            throw new BadRequestException(
                this.i18nService.translate(
                    'bookings.GUEST_HAS_ALREADY_REVIEWED',
                ),
            );
        }

        const session = await this.connection.startSession();

        let updatedBooking: any;
        await session.withTransaction(async () => {
            updatedBooking = await this.bookingRepository.findByIdAndUpdate(
                id,
                { guest_review: body },
                { returnDocument: 'after', lean: true, session },
            );

            await this.unitReviewsService.createUnitReview(
                {
                    booking_id: id,
                    unit_id: booking.unit_id,
                    guest_id: booking.guest_id.toString(),
                    rating: body.rating,
                    comment: body.comment,
                },
                session,
            );

            const { rating_avg, rating_count } =
                await this.unitReviewsService.calculateRatingAvg(
                    booking.unit_id.toString(),
                    session,
                );

            await this.unitsService.updateUnitAvgRateAndCount(
                {
                    unit_id: booking.unit_id.toString(),
                    unit_reviews_count: rating_count,
                    unit_avg_rate: rating_avg,
                },
                session,
            );
        });

        return plainToInstance(BookingResponseDto, updatedBooking);
    }
}
