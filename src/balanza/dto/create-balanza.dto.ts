import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBalanzaDto {
  @IsString()
  @ApiProperty({
    description: 'Rack principal de limpieza',
    type: String,
  })
  RackPrincipalLimpieza: string;

  @IsString()
  @ApiProperty({
    description: 'Rack principal de orden',
    type: String,
  })
  RackPrincipalOrden: string;

  @IsString()
  @ApiProperty({
    description: 'Limpiar PC',
    type: String,
  })
  LimpiarPC: string;

  @IsString()
  @ApiProperty({
    description: 'Funcionamiento del AP',
    type: String,
  })
  FuncionamientoAP: string;

  @IsString()
  @ApiProperty({
    description: 'Funcionamiento de la UPS',
    type: String,
  })
  UPS: string;

  @IsString()
  @ApiProperty({
    description: 'Funcionamiento del teléfono',
    type: String,
  })
  FuncionamientoTelefono: string;
}
