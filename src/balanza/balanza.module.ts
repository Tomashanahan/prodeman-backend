import { Module } from '@nestjs/common';
import { BalanzaService } from './balanza.service';
import { BalanzaController } from './balanza.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balanza } from './entities/balanza.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [BalanzaController],
  providers: [BalanzaService],
  imports: [TypeOrmModule.forFeature([Balanza]), AuthModule],
  exports: [TypeOrmModule],
})
export class BalanzaModule {}
