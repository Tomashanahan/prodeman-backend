import { Module, forwardRef } from '@nestjs/common';
import { CamarasService } from './camaras.service';
import { CamarasController } from './camaras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Camara } from './entities/camara.entity';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [CamarasController],
  providers: [CamarasService],
  imports: [TypeOrmModule.forFeature([Camara]), forwardRef(() => AuthModule), CommonModule],
  exports: [TypeOrmModule, CamarasService],
})
export class CamarasModule {}
