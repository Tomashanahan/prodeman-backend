import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateExAgroinsumoDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Rack principal para limpieza',
  })
  RackPrincipalLimpieza: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Rack principal para orden',
  })
  RackPrincipalOrden: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Funcionamiento de AP',
  })
  FuncionamientoAP: string;
}
