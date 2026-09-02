import {
    Controller,
    Post,
    Body,
    Patch,
    Param,
    Get,
    Query,
    Delete,
} from '@nestjs/common';
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
import { Public } from 'src/auth/decorators/public.decorator';
import { GetAllUnitsDto } from './dtos/get-all.usecase.dto';

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

    @Get()
    @Public()
    async GetAll(@Query() query: GetAllUnitsDto) {
        return await this.unitsService.GetAll(query);
    }

    @Get('by-user')
    @AllowRoles(Roles.USER)
    async GetAllByUser(
        @Query() query: GetAllUnitsDto,
        @CurrentUser() principal: Principal,
    ) {
        return await this.unitsService.GetAllUnitsByUser(query, principal.user);
    }

    @Public()
    @Get(':id')
    async GetById(@Param('id', new ParseMongoIdPipe()) id: string) {
        return await this.unitsService.GetById(id);
    }

    @Delete(':id/soft-delete')
    @AllowRoles(Roles.USER)
    async SoftDeleteOneUnit(
        @Param('id', new ParseMongoIdPipe()) id: string,
        @CurrentUser() principal: Principal,
    ) {
        return await this.unitsService.SoftDeleteOneUnit(id, principal.user);
    }

    @Patch(':id/deactivate')
    @AllowRoles(Roles.USER)
    async DeActivateUnit(
        @Param('id', new ParseMongoIdPipe()) id: string,
        @CurrentUser() principal: Principal,
    ) {
        return await this.unitsService.DeActivateUnit(id, principal.user);
    }

    @Patch(':id/activate')
    @AllowRoles(Roles.USER)
    async ActivateUnit(
        @Param('id', new ParseMongoIdPipe()) id: string,
        @CurrentUser() principal: Principal,
    ) {
        return await this.unitsService.ActivateUnit(id, principal.user);
    }
}
