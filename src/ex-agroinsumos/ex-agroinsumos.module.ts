import { Module } from '@nestjs/common';
import { ExAgroinsumosService } from './ex-agroinsumos.service';
import { ExAgroinsumosController } from './ex-agroinsumos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExAgroinsumo } from './entities/ex-agroinsumo.entity';

@Module({
  controllers: [ExAgroinsumosController],
  providers: [ExAgroinsumosService],
  imports: [TypeOrmModule.forFeature([ExAgroinsumo])],
  exports: [TypeOrmModule],
})
export class ExAgroinsumosModule {}
