import { Controller, Post, Body } from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dtos/create-unit.dto';
import {
    CurrentUser,
    Principal,
} from 'src/auth/decorators/current-user.decorator';
import { AllowRoles } from '../auth/decorators/roles.decorator';
import { Roles } from 'src/common/constants/roles.constans';

@Controller('units')
export class UnitsController {
    constructor(private readonly unitsService: UnitsService) {}

    @Post()
    @AllowRoles(Roles.USER)
    async create(
        @Body() body: CreateUnitDto,
        @CurrentUser() principal: Principal,
    ) {
        return await this.unitsService.createUnit(body, principal.user);
    }
}
