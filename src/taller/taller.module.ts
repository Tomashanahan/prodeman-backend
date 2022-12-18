import { Module } from '@nestjs/common';
import { TallerService } from './taller.service';
import { TallerController } from './taller.controller';

@Module({
  controllers: [TallerController],
  providers: [TallerService]
})
export class TallerModule {}
