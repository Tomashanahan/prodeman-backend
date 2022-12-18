import { Module } from '@nestjs/common';
import { TallerService } from './taller.service';
import { TallerController } from './taller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taller } from './entities/taller.entity';

@Module({
  controllers: [TallerController],
  providers: [TallerService],
  imports: [TypeOrmModule.forFeature([Taller])],
  exports: [TypeOrmModule],
})
export class TallerModule {}
