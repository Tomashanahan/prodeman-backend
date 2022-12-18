import { PartialType } from '@nestjs/swagger';
import { CreateHangarOficinaDto } from './create-hangar-oficina.dto';

export class UpdateHangarOficinaDto extends PartialType(CreateHangarOficinaDto) {}
