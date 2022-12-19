import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBalanzaDto {
  @IsString()
  @ApiProperty()
  preference_id: string;

  @IsString()
  @ApiProperty()
  RackPrincipalLimpieza: string;

  @IsString()
  @ApiProperty()
  RackPrincipalOrden: string;

  @IsString()
  @ApiProperty()
  LimpiarPC: string;

  @IsString()
  @ApiProperty()
  FuncionamientoAP: string;

  @IsString()
  @ApiProperty()
  UPS: string;

  @IsString()
  @ApiProperty()
  FuncionamientoTelefono: string;
}
