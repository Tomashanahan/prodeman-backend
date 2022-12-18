import { Module } from '@nestjs/common';
import { CasaPrincipalService } from './casa-principal.service';
import { CasaPrincipalController } from './casa-principal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasaPrincipal } from './entities/casa-principal.entity';

@Module({
  controllers: [CasaPrincipalController],
  providers: [CasaPrincipalService],
  imports: [TypeOrmModule.forFeature([CasaPrincipal])],
  exports: [TypeOrmModule],
})
export class CasaPrincipalModule {}
