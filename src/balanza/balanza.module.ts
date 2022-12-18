import { Module } from '@nestjs/common';
import { BalanzaService } from './balanza.service';
import { BalanzaController } from './balanza.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balanza } from './entities/balanza.entity';

@Module({
  controllers: [BalanzaController],
  providers: [BalanzaService],
  imports: [TypeOrmModule.forFeature([Balanza])],
  exports: [TypeOrmModule],
})
export class BalanzaModule {}
