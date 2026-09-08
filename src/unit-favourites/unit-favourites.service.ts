import { Injectable } from '@nestjs/common';
import { GetUnitFavoritesUseCase } from './use-cases/get-unit-favourites.usecase';
import { RemoveUnitFavoriteUseCase } from './use-cases/remove-unit-from-favourites.usecase';
import { AddUnitToFavouritesUseCase } from './use-cases/add-unit-to-favourites.usecase';
import { GetUnitFavouritesDto } from './dtos/get-unit-favourites.dto';
import { CurrentUserData } from 'src/auth/interfaces/principal.interface';
import { UnitFavouritesResponseDto } from './dtos/unit-favourites-response.dto';
import { PaginatedResult } from 'src/common/data-access';

@Injectable()
export class UnitFavouritesService {
    constructor(
        private readonly getUnitFavoritesUseCase: GetUnitFavoritesUseCase,
        private readonly removeUnitFavoriteUseCase: RemoveUnitFavoriteUseCase,
        private readonly addUnitToFavouritesUseCase: AddUnitToFavouritesUseCase,
    ) {}
    async getUnitFavorites(
        query: GetUnitFavouritesDto,
        currentUser: CurrentUserData,
    ): Promise<PaginatedResult<UnitFavouritesResponseDto>> {
        return this.getUnitFavoritesUseCase.execute(query, currentUser);
    }

    async removeUnitFromFavorites(
        unitId: string,
        currentUser: CurrentUserData,
    ): Promise<void> {
        return this.removeUnitFavoriteUseCase.execute(unitId, currentUser);
    }

    async addUnitToFavorites(
        unitId: string,
        currentUser: CurrentUserData,
    ): Promise<void> {
        return this.addUnitToFavouritesUseCase.execute(unitId, currentUser);
    }
}
