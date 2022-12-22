import { Module, forwardRef } from '@nestjs/common';
import { ExAgroinsumosService } from './ex-agroinsumos.service';
import { ExAgroinsumosController } from './ex-agroinsumos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExAgroinsumo } from './entities/ex-agroinsumo.entity';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [ExAgroinsumosController],
  providers: [ExAgroinsumosService],
  imports: [
    TypeOrmModule.forFeature([ExAgroinsumo]),
    forwardRef(() => AuthModule),
    CommonModule,
  ],
  exports: [TypeOrmModule, ExAgroinsumosService],
})
export class ExAgroinsumosModule {}
