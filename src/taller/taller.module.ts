import { Module } from '@nestjs/common';
import { TallerService } from './taller.service';
import { TallerController } from './taller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taller } from './entities/taller.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [TallerController],
  providers: [TallerService],
  imports: [TypeOrmModule.forFeature([Taller]), AuthModule],
  exports: [TypeOrmModule],
})
export class TallerModule {}
