import { PartialType } from '@nestjs/swagger';
import { CreateTallerDto } from './create-taller.dto';

export class UpdateTallerDto extends PartialType(CreateTallerDto) {}
