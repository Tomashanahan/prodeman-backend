import { Module } from '@nestjs/common';
import { BalanzaService } from './balanza.service';
import { BalanzaController } from './balanza.controller';

@Module({
  controllers: [BalanzaController],
  providers: [BalanzaService]
})
export class BalanzaModule {}
