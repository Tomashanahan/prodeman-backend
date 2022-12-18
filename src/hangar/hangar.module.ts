import { Module } from '@nestjs/common';
import { HangarService } from './hangar.service';
import { HangarController } from './hangar.controller';

@Module({
  controllers: [HangarController],
  providers: [HangarService]
})
export class HangarModule {}
