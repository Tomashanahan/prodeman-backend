import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAgroinsumoDto {
  @IsString()
  @ApiProperty()
  FuncionamientoAP: string;
}
