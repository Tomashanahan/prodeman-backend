import { Module, forwardRef } from '@nestjs/common';
import { AgroinsumosService } from './agroinsumos.service';
import { AgroinsumosController } from './agroinsumos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agroinsumo } from './entities/agroinsumo.entity';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [AgroinsumosController],
  providers: [AgroinsumosService],
  imports: [TypeOrmModule.forFeature([Agroinsumo]), forwardRef(() => AuthModule), CommonModule],
  exports: [TypeOrmModule, AgroinsumosService],
})
export class AgroinsumosModule {}
