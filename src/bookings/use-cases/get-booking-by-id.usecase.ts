import { Injectable } from '@nestjs/common';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { BookingRepository } from '../repositories/booking.repository';
import { Principal } from 'src/auth/decorators/current-user.decorator';
import { CheckCurrentUserUseCase } from './check-current-user.usecase';
import { Roles } from 'src/common/constants/roles.constans';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GetBookingByIdUseCase {
    constructor(
        private readonly bookingRepository: BookingRepository,
        private readonly checkCurrentUserUseCase: CheckCurrentUserUseCase,
    ) {}
    async execute(
        id: string,
        principal: Principal,
    ): Promise<BookingResponseDto> {
        if (principal.role === Roles.USER) {
            await this.checkCurrentUserUseCase.execute(id, principal.user._id);
        }
        const booking = await this.bookingRepository.findById(id, {
            populate: [
                { path: 'unit_id', select: 'unit_title' },
                { path: 'guest_id', select: 'user_name user_email user_phone' },
                { path: 'host_id', select: 'user_name user_email user_phone' },
            ],
        });
        return plainToInstance(BookingResponseDto, booking?.toObject());
    }
}
