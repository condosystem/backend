import { Module } from '@nestjs/common';
import { UnitySectionService } from './unity-section.service';
import { UnitySectionController } from './unity-section.controller';

@Module({
  providers: [UnitySectionService],
  controllers: [UnitySectionController]
})
export class UnitySectionModule {}
