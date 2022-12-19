import { Module } from '@nestjs/common';
import { HangarOficinaService } from './hangar-oficina.service';
import { HangarOficinaController } from './hangar-oficina.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HangarOficina } from './entities/hangar-oficina.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [HangarOficinaController],
  providers: [HangarOficinaService],
  imports: [TypeOrmModule.forFeature([HangarOficina]), AuthModule],
  exports: [TypeOrmModule],
})
export class HangarOficinaModule {}
