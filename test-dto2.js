const { validateSync, IsNotEmpty, IsNumber, IsBoolean, IsString } = require('class-validator');
const { plainToInstance } = require('class-transformer');

class CreateUnitDto {
    @IsNotEmpty()
    @IsString()
    unit_title;

    @IsNotEmpty()
    @IsNumber()
    unit_cost_per_night;

    @IsNotEmpty()
    @IsBoolean()
    has_internet_service;
}

const payload = {
    unit_title: 'Test',
    unit_cost_per_night: '100',
    has_internet_service: 'false'
};

const dto = plainToInstance(CreateUnitDto, payload, { enableImplicitConversion: true });
console.log("Transformed DTO:", dto);
const errors = validateSync(dto);
console.log("Errors:", JSON.stringify(errors, null, 2));
