import { PartialType } from '@nestjs/swagger';
import { CreateCasaPrincipalDto } from './create-casa-principal.dto';

export class UpdateCasaPrincipalDto extends PartialType(CreateCasaPrincipalDto) {}
