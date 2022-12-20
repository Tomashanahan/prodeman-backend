import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTallerDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'RackPrincipalLimpieza of the CreateTallerDto',
    example: 'Limpieza',
  })
  RackPrincipalLimpieza: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'RackPrincipalOrden of the CreateTallerDto',
    example: 'Orden',
  })
  RackPrincipalOrden: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'FuncionamientoTelefono of the CreateTallerDto',
    example: 'Telefono',
  })
  FuncionamientoTelefono: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'FuncionamientoAP of the CreateTallerDto',
    example: 'AP',
  })
  FuncionamientoAP: string;
}
