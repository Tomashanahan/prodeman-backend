import { PartialType } from '@nestjs/swagger';
import { CreateCamaraDto } from './create-camara.dto';

export class UpdateCamaraDto extends PartialType(CreateCamaraDto) {}
