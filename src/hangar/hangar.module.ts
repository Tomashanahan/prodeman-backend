import { Module, forwardRef } from '@nestjs/common';
import { HangarService } from './hangar.service';
import { HangarController } from './hangar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hangar } from './entities/hangar.entity';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [HangarController],
  providers: [HangarService],
  imports: [TypeOrmModule.forFeature([Hangar]), forwardRef(() => AuthModule), CommonModule],
  exports: [TypeOrmModule, HangarService],
})
export class HangarModule {}
