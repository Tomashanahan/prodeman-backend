import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCasaPrincipalDto {
  @ApiProperty({
    description:
      'RackPrincipalLimpieza - Rack principal de la casa para limpieza',
    type: 'string',
  })
  @IsString()
  RackPrincipalLimpieza: string;

  @ApiProperty({
    description: 'RackPrincipalOrden - Rack principal de la casa para orden',
    type: 'string',
  })
  @IsString()
  RackPrincipalOrden: string;

  @ApiProperty({
    description: 'FuncionamientoAP - Funcionamiento del punto de acceso',
    type: 'string',
  })
  @IsString()
  FuncionamientoAP: string;

  @ApiProperty({
    description:
      'FuncionamientoTelefono - El funcionamiento del teléfono en la casa',
    type: 'string',
  })
  @IsString()
  FuncionamientoTelefono: string;

  @ApiProperty({
    description: 'UPS - El funcionamiento',
    type: 'string',
  })
  @IsString()
  UPS: string;
}
