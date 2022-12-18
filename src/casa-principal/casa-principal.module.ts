import { Module } from '@nestjs/common';
import { CasaPrincipalService } from './casa-principal.service';
import { CasaPrincipalController } from './casa-principal.controller';

@Module({
  controllers: [CasaPrincipalController],
  providers: [CasaPrincipalService]
})
export class CasaPrincipalModule {}
