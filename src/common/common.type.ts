import { Agroinsumo } from '../agroinsumos/entities/agroinsumo.entity';
import { Balanza } from '../balanza/entities/balanza.entity';
import { Camara } from '../camaras/entities/camara.entity';
import { CasaPrincipal } from '../casa-principal/entities/casa-principal.entity';
import { ExAgroinsumo } from '../ex-agroinsumos/entities/ex-agroinsumo.entity';
import { Hangar } from '../hangar/entities/hangar.entity';
import { HangarOficina } from '../hangar-oficina/entities/hangar-oficina.entity';
import { Taller } from '../taller/entities/taller.entity';

export type DomainEntity =
  | Agroinsumo
  | Balanza
  | Camara
  | CasaPrincipal
  | ExAgroinsumo
  | Hangar
  | HangarOficina
  | Taller;
