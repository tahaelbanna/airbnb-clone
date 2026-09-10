import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { AllowRoles } from '../auth/decorators/roles.decorator';
import { Roles } from '../common/constants';
import {
    CurrentUser,
    Principal,
} from 'src/auth/decorators/current-user.decorator';
import { UnitFavouritesService } from './unit-favourites.service';
import { GetUnitFavouritesDto } from './dtos/get-unit-favourites.dto';
import { PaginatedResult } from '../common/data-access';
import { UnitFavouritesResponseDto } from './dtos/unit-favourites-response.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_TAGS } from '../common/swagger';
import { AddFavoriteSwagger, RemoveFavoriteSwagger, GetFavoritesSwagger } from './swagger';

@ApiTags(API_TAGS.UNIT_FAVOURITES)
@ApiBearerAuth()
@Controller('unit-favourites')
@AllowRoles(Roles.USER)
export class UnitFavouritesController {
    constructor(
        private readonly unitFavouritesService: UnitFavouritesService,
    ) {}

    @Post('/:unitId')
    @AddFavoriteSwagger()
    async addFavorite(
        @Param('unitId') unitId: string,
        @CurrentUser() principal: Principal,
    ): Promise<void> {
        return this.unitFavouritesService.addUnitToFavorites(
            unitId,
            principal.user,
        );
    }

    @Delete('/:unitId')
    @RemoveFavoriteSwagger()
    async removeFavorite(
        @Param('unitId') unitId: string,
        @CurrentUser() principal: Principal,
    ): Promise<void> {
        return this.unitFavouritesService.removeUnitFromFavorites(
            unitId,
            principal.user,
        );
    }

    @Get()
    @GetFavoritesSwagger()
    async getFavorites(
        @Query() query: GetUnitFavouritesDto,
        @CurrentUser() principal: Principal,
    ): Promise<PaginatedResult<UnitFavouritesResponseDto>> {
        return this.unitFavouritesService.getUnitFavorites(
            query,
            principal.user,
        );
    }
}
