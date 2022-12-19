import { Module } from '@nestjs/common';
import { ExAgroinsumosService } from './ex-agroinsumos.service';
import { ExAgroinsumosController } from './ex-agroinsumos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExAgroinsumo } from './entities/ex-agroinsumo.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ExAgroinsumosController],
  providers: [ExAgroinsumosService],
  imports: [TypeOrmModule.forFeature([ExAgroinsumo]), AuthModule],
  exports: [TypeOrmModule],
})
export class ExAgroinsumosModule {}
