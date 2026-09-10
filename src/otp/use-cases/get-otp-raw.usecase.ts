import { Injectable } from '@nestjs/common';
import { OtpRepository } from '../repositories/otp.repository';
import { QueryFilter } from 'mongoose';
import { Otp } from '../schemas/otp.schema';
import { OtpRawResponseDto } from '../dtos/otp-raw-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GetOtpRawUsecase {
    constructor(private readonly otpRepository: OtpRepository) {}

    async execute(query: QueryFilter<Otp>): Promise<OtpRawResponseDto> {
        const otp = await this.otpRepository.findOne(query);
        return plainToInstance(OtpRawResponseDto, otp);
    }
}
