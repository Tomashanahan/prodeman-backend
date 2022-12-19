import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCasaPrincipalDto {
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

  @IsString()
  @ApiProperty()
  UPS: string;
}
