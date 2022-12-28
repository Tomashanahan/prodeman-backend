import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserTeam } from '../interfaces/index';
import { Agroinsumo } from '../../agroinsumos/entities/agroinsumo.entity';
import { Balanza } from '../../balanza/entities/balanza.entity';
import { Camara } from '../../camaras/entities/camara.entity';
import { CasaPrincipal } from '../../casa-principal/entities/casa-principal.entity';
import { ExAgroinsumo } from '../../ex-agroinsumos/entities/ex-agroinsumo.entity';
import { Hangar } from '../../hangar/entities/hangar.entity';
import { HangarOficina } from '../../hangar-oficina/entities/hangar-oficina.entity';
import { Taller } from '../../taller/entities/taller.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column('text', { unique: true })
  @ApiProperty()
  email: string;

  // @Column('text', { select: false })
  @Column('text')
  @ApiProperty()
  password: string;

  @Column('text')
  @ApiProperty()
  fullName: string;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  @ApiProperty()
  rol: string[];

  @Column({
    type: 'enum',
    enum: UserTeam,
  })
  @ApiProperty()
  team: 'Microinformatica' | 'Telecomunicaciones';

  @OneToMany(() => Agroinsumo, (agroinsumo) => agroinsumo.user)
  agroinsumo: Agroinsumo;

  @OneToMany(() => Balanza, (balanza) => balanza.user)
  balanza: Balanza;

  @OneToMany(() => Camara, (camara) => camara.user)
  camara: Camara;

  @OneToMany(() => CasaPrincipal, (casaPrincipal) => casaPrincipal.user)
  casaPrincipal: CasaPrincipal;

  @OneToMany(() => ExAgroinsumo, (exAgroinsumo) => exAgroinsumo.user)
  exAgroinsumo: ExAgroinsumo;

  @OneToMany(() => Hangar, (hangar) => hangar.user)
  hangar: Hangar;

  @OneToMany(() => HangarOficina, (hangarOficina) => hangarOficina.user)
  hangarOficina: HangarOficina;

  @OneToMany(() => Taller, (taller) => taller.user)
  taller: Taller;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
