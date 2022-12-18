import { PartialType } from '@nestjs/swagger';
import { CreateExAgroinsumoDto } from './create-ex-agroinsumo.dto';

export class UpdateExAgroinsumoDto extends PartialType(CreateExAgroinsumoDto) {}
