import { Module } from '@nestjs/common';

import { CoreModule } from './core.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CountriesModule } from './countries/countries.module';
import { CitiesModule } from './cities/cities.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { UnitCategoriesModule } from './unit-categories/unit-categories.module';
import { AppSettingsModule } from './app-settings/app-settings.module';
import { SystemAdminModule } from './system-admin/system-admin.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RoleGuardG } from './auth/guards/role-guard.guard';

@Module({
    imports: [
        CoreModule,
        UsersModule,
        AuthModule,
        CountriesModule,
        CitiesModule,
        CurrenciesModule,
        UnitCategoriesModule,
        AppSettingsModule,
        SystemAdminModule,
    ],
    providers: [
        { provide: APP_GUARD, useClass: JwtAuthGuard },
        { provide: APP_GUARD, useClass: RoleGuardG },
    ],
})
export class AppModule {}
