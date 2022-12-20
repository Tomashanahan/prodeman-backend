import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAgroinsumoDto {
  @IsString()
  @ApiProperty({
    description: 'The FuncionamientoAP name',
    type: 'string',
  })
  FuncionamientoAP: string;
}
