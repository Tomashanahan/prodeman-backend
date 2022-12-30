import { Connection, createConnection } from 'typeorm';
import { User } from '../src/auth/entities/user.entity';
import { Agroinsumo } from '../src/agroinsumos/entities/agroinsumo.entity';
import { Balanza } from '../src/balanza/entities/balanza.entity';
import { Camara } from '../src/camaras/entities/camara.entity';
import { Taller } from '../src/taller/entities/taller.entity';
import { HangarOficina } from '../src/hangar-oficina/entities/hangar-oficina.entity';
import { Hangar } from '../src/hangar/entities/hangar.entity';
import { ExAgroinsumo } from '../src/ex-agroinsumos/entities/ex-agroinsumo.entity';
import { CasaPrincipal } from '../src/casa-principal/entities/casa-principal.entity';

export const clearDB = async (connection: Connection | void) => {
  if (connection) {
    await connection.dropDatabase();
    await connection.synchronize();
  }
};

export const _getConnection = async () => {
  return await createConnection({
    name: 'default2',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT_TEST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    entities: [User, Agroinsumo, Balanza, Camara, Taller, HangarOficina, Hangar, ExAgroinsumo, CasaPrincipal],
  });
};
