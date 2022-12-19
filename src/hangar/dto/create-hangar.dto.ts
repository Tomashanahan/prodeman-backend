import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateHangarDto {
  @IsString()
  @ApiProperty()
  RackPrincipalLimpieza: string;

  @IsString()
  @ApiProperty()
  RackPrincipalOrden: string;

  @IsString()
  @ApiProperty()
  FuncionamientoAP: string;

  @IsString()
  @ApiProperty()
  FuncionamientoTelefono: string;
}
