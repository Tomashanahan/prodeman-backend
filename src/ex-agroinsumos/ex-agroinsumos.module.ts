import { Module } from '@nestjs/common';
import { ExAgroinsumosService } from './ex-agroinsumos.service';
import { ExAgroinsumosController } from './ex-agroinsumos.controller';

@Module({
  controllers: [ExAgroinsumosController],
  providers: [ExAgroinsumosService]
})
export class ExAgroinsumosModule {}
