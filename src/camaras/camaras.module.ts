import { Module } from '@nestjs/common';
import { CamarasService } from './camaras.service';
import { CamarasController } from './camaras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Camara } from './entities/camara.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CamarasController],
  providers: [CamarasService],
  imports: [TypeOrmModule.forFeature([Camara]), AuthModule],
  exports: [TypeOrmModule],
})
export class CamarasModule {}
