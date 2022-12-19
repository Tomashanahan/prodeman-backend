import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTallerDto {
  @IsString()
  @ApiProperty()
  RackPrincipalLimpieza: string;

  @IsString()
  @ApiProperty()
  RackPrincipalOrden: string;

  @IsString()
  @ApiProperty()
  FuncionamientoTelefono: string;

  @IsString()
  @ApiProperty()
  FuncionamientoAP: string;
}
