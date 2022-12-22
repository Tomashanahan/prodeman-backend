import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategies';
import { TallerModule } from '../taller/taller.module';
import { HangarOficinaModule } from '../hangar-oficina/hangar-oficina.module';
import { HangarModule } from '../hangar/hangar.module';
import { ExAgroinsumosModule } from '../ex-agroinsumos/ex-agroinsumos.module';
import { CasaPrincipalModule } from '../casa-principal/casa-principal.module';
import { CamarasModule } from '../camaras/camaras.module';
import { BalanzaModule } from '../balanza/balanza.module';
import { AgroinsumosModule } from '../agroinsumos/agroinsumos.module';
import { forwardRef } from '@nestjs/common';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '2h' },
        };
      },
    }),
    forwardRef(() => AgroinsumosModule),
    forwardRef(() => BalanzaModule),
    forwardRef(() => CamarasModule),
    forwardRef(() => CasaPrincipalModule),
    forwardRef(() => ExAgroinsumosModule),
    forwardRef(() => HangarModule),
    forwardRef(() => HangarOficinaModule),
    forwardRef(() => TallerModule),
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
