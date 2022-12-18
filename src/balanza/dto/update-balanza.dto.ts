import { PartialType } from '@nestjs/swagger';
import { CreateBalanzaDto } from './create-balanza.dto';

export class UpdateBalanzaDto extends PartialType(CreateBalanzaDto) {}
