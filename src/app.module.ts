import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AgroinsumosModule } from './agroinsumos/agroinsumos.module';
import { BalanzaModule } from './balanza/balanza.module';
import { CamarasModule } from './camaras/camaras.module';
import { TallerModule } from './taller/taller.module';
import { HangarOficinaModule } from './hangar-oficina/hangar-oficina.module';
import { HangarModule } from './hangar/hangar.module';
import { ExAgroinsumosModule } from './ex-agroinsumos/ex-agroinsumos.module';
import { CasaPrincipalModule } from './casa-principal/casa-principal.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    AgroinsumosModule,
    BalanzaModule,
    CamarasModule,
    CasaPrincipalModule,
    ExAgroinsumosModule,
    HangarModule,
    HangarOficinaModule,
    TallerModule,
  ],
})
export class AppModule {}
