import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dtos/create-unit.dto';
import {
    CurrentUser,
    Principal,
} from 'src/auth/decorators/current-user.decorator';
import { AllowRoles } from '../auth/decorators/roles.decorator';
import { Roles } from 'src/common/constants/roles.constans';
import { UpdateUnitDto } from './dtos/update-unit.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('units')
export class UnitsController {
    constructor(private readonly unitsService: UnitsService) {}

    @Post()
    @AllowRoles(Roles.USER)
    async create(
        @Body() body: CreateUnitDto,
        @CurrentUser() principal: Principal,
    ) {
        return await this.unitsService.create(body, principal.user);
    }

    @Patch(':id')
    @AllowRoles(Roles.USER)
    async update(
        @Param('id', new ParseMongoIdPipe()) id: string,
        @Body() body: UpdateUnitDto,
        @CurrentUser() principal: Principal,
    ) {
        return await this.unitsService.update(id, body, principal.user);
    }
}
