import { Module } from '@nestjs/common';
import { HangarOficinaService } from './hangar-oficina.service';
import { HangarOficinaController } from './hangar-oficina.controller';

@Module({
  controllers: [HangarOficinaController],
  providers: [HangarOficinaService]
})
export class HangarOficinaModule {}
