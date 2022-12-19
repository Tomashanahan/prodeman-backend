import { Module } from '@nestjs/common';
import { AgroinsumosService } from './agroinsumos.service';
import { AgroinsumosController } from './agroinsumos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agroinsumo } from './entities/agroinsumo.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [AgroinsumosController],
  providers: [AgroinsumosService],
  imports: [TypeOrmModule.forFeature([Agroinsumo]), AuthModule],
  exports: [TypeOrmModule],
})
export class AgroinsumosModule {}
