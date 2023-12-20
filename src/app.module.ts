/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { AccountTypeModule } from './account-type/account-type.module';
import { LocalityModule } from './locality/locality.module';
import { UnityModule } from './unity/unity.module';
import { SectorModule } from './sector/sector.module';
import { MinistryModule } from './ministry/ministry.module';
import { PersonModule } from './person/person.module';
import { EntranceModule } from './entrance/entrance.module';

@Module({
  imports: [AuthModule, PrismaModule, AccountTypeModule, LocalityModule, UnityModule, SectorModule, MinistryModule, PersonModule, EntranceModule],
  providers: [{
    provide: APP_GUARD,
    useClass: AtGuard
  }],
})
export class AppModule { }
