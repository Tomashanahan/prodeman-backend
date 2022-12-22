import { Module, forwardRef } from '@nestjs/common';
import { TallerService } from './taller.service';
import { TallerController } from './taller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taller } from './entities/taller.entity';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [TallerController],
  providers: [TallerService],
  imports: [
    TypeOrmModule.forFeature([Taller]),
    forwardRef(() => AuthModule),
    CommonModule,
  ],
  exports: [TypeOrmModule, TallerService],
})
export class TallerModule {}
