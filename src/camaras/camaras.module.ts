import { Module } from '@nestjs/common';
import { CamarasService } from './camaras.service';
import { CamarasController } from './camaras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Camara } from './entities/camara.entity';

@Module({
  controllers: [CamarasController],
  providers: [CamarasService],
  imports: [TypeOrmModule.forFeature([Camara])],
  exports: [TypeOrmModule],
})
export class CamarasModule {}
