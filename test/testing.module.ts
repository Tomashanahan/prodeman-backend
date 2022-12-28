import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AuthModule } from '../src/auth/auth.module';
import { AgroinsumosModule } from '../src/agroinsumos/agroinsumos.module';
import { BalanzaModule } from '../src/balanza/balanza.module';
import { CamarasModule } from '../src/camaras/camaras.module';
import { TallerModule } from '../src/taller/taller.module';
import { HangarOficinaModule } from '../src/hangar-oficina/hangar-oficina.module';
import { HangarModule } from '../src/hangar/hangar.module';
import { CommonModule } from '../src/common/common.module';
import { CasaPrincipalModule } from '../src/casa-principal/casa-principal.module';
import { ExAgroinsumosModule } from '../src/ex-agroinsumos/ex-agroinsumos.module';

@Module({
  imports: [
    AuthModule,
    AgroinsumosModule,
    BalanzaModule,
    CamarasModule,
    CasaPrincipalModule,
    ExAgroinsumosModule,
    HangarModule,
    HangarOficinaModule,
    TallerModule,
    CommonModule,
  ],
})
export class TestingModule {
  constructor() {}
}
