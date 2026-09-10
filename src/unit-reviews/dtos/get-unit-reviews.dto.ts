import { PaginationDto } from '../../common/dtos/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetUnitReviewDto extends PaginationDto {
    @ApiProperty({
        description: 'The ID of the unit for which reviews are being fetched',
        example: '507f1f77bcf86cd00892931b',
    })
    unit_id: string;
}
