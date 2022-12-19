import { Module } from '@nestjs/common';
import { HangarService } from './hangar.service';
import { HangarController } from './hangar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hangar } from './entities/hangar.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [HangarController],
  providers: [HangarService],
  imports: [TypeOrmModule.forFeature([Hangar]), AuthModule],
  exports: [TypeOrmModule],
})
export class HangarModule {}
