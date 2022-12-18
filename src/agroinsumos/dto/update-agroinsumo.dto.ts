import { PartialType } from '@nestjs/swagger';
import { CreateAgroinsumoDto } from './create-agroinsumo.dto';

export class UpdateAgroinsumoDto extends PartialType(CreateAgroinsumoDto) {}
