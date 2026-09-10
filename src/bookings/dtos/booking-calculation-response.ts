import { ApiProperty } from '@nestjs/swagger';

export class BookingCalculationResponse {
    @ApiProperty({
        description: 'The price per night',
        example: 100,
    })
    price_per_night: number;

    @ApiProperty({
        description: 'The number of nights the unit is available for',
        example: 5,
    })
    nights_count: number;

    @ApiProperty({
        description: 'The total booking amount',
        example: 500,
    })
    booking_amount: number;

    @ApiProperty({
        description: 'The VAT rate',
        example: 0.1,
    })
    vat: number;
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
