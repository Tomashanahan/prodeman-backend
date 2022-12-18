import { PartialType } from '@nestjs/swagger';
import { CreateHangarDto } from './create-hangar.dto';

export class UpdateHangarDto extends PartialType(CreateHangarDto) {}
