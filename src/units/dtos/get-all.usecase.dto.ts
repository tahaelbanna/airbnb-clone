import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class GetAllUnitsDto extends PaginationDto {
    @ApiProperty({
        description: 'Unit title',
        example: 'Cozy apartment in downtown',
    })
    @IsOptional()
    @IsString()
    unit_title?: string;

    @ApiProperty({
        description: 'Country ID',
        example: '65a1b2c3d4e5f67890123456',
    })
    @IsOptional()
    @IsMongoId()
    @IsString()
    unit_country_id?: string;

    @ApiProperty({
        description: 'City ID',
        example: '65a1b2c3d4e5f67890123456',
    })
    @IsOptional()
    @IsMongoId()
    @IsString()
    unit_city_id?: string;
}
