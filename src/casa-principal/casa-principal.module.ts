import { Module, forwardRef } from '@nestjs/common';
import { CasaPrincipalService } from './casa-principal.service';
import { CasaPrincipalController } from './casa-principal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasaPrincipal } from './entities/casa-principal.entity';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [CasaPrincipalController],
  providers: [CasaPrincipalService],
  imports: [
    TypeOrmModule.forFeature([CasaPrincipal]),
    forwardRef(() => AuthModule),
    CommonModule,
  ],
  exports: [TypeOrmModule, CasaPrincipalService],
})
export class CasaPrincipalModule {}
