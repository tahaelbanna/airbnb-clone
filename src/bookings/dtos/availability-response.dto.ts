import { ApiProperty } from '@nestjs/swagger';
export class AvailabilityResponseDto {
    @ApiProperty({
        description:
            'Indicates whether the unit is available for the specified dates',
        example: true,
    })
    available: boolean;

    @ApiProperty({
        description: 'The number of nights the unit is available for',
        example: 5,
    })
    nights_count: number;
    @ApiProperty({
        description: 'The price per night',
        example: 100,
    })
    price_per_night: number;

    @ApiProperty({
        description: 'The total booking amount',
        example: 500,
    })
    booking_amount: number;
    @ApiProperty({
        description: 'The VAT amount',
        example: 50,
    })
    vat_amount: number;
    @ApiProperty({
        description: 'The total amount including VAT',
        example: 550,
    })
    total_amount: number;
}
