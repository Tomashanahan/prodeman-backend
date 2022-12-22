import { Module, forwardRef } from '@nestjs/common';
import { BalanzaService } from './balanza.service';
import { BalanzaController } from './balanza.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balanza } from './entities/balanza.entity';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [BalanzaController],
  providers: [BalanzaService],
  imports: [
    TypeOrmModule.forFeature([Balanza]),
    forwardRef(() => AuthModule),
    CommonModule,
  ],
  exports: [TypeOrmModule, BalanzaService],
})
export class BalanzaModule {}
