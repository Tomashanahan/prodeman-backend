import { Module } from '@nestjs/common';
import { CamarasService } from './camaras.service';
import { CamarasController } from './camaras.controller';

@Module({
  controllers: [CamarasController],
  providers: [CamarasService]
})
export class CamarasModule {}
