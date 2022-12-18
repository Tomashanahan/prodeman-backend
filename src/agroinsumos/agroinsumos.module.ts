import { Module } from '@nestjs/common';
import { AgroinsumosService } from './agroinsumos.service';
import { AgroinsumosController } from './agroinsumos.controller';

@Module({
  controllers: [AgroinsumosController],
  providers: [AgroinsumosService]
})
export class AgroinsumosModule {}
