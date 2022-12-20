import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateHangarDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'RackPrincipalLimpieza - Rack principal para la limpieza',
    example: 'Rack 1',
  })
  RackPrincipalLimpieza: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'RackPrincipalOrden - Rack principal para el orden',
    example: 'Rack 2',
  })
  RackPrincipalOrden: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'FuncionamientoAP - Funcionamiento de la AP',
    example: 'AP 1',
  })
  FuncionamientoAP: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'FuncionamientoTelefono - Funcionamiento del teléfono',
    example: 'Telefono 1',
  })
  FuncionamientoTelefono: string;
}
