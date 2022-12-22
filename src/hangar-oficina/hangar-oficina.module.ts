import { Module, forwardRef } from '@nestjs/common';
import { HangarOficinaService } from './hangar-oficina.service';
import { HangarOficinaController } from './hangar-oficina.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HangarOficina } from './entities/hangar-oficina.entity';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [HangarOficinaController],
  providers: [HangarOficinaService],
  imports: [
    TypeOrmModule.forFeature([HangarOficina]),
    forwardRef(() => AuthModule),
    CommonModule,
  ],
  exports: [TypeOrmModule, HangarOficinaService],
})
export class HangarOficinaModule {}
