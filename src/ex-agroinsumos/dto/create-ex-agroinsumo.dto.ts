import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateExAgroinsumoDto {
  @IsString()
  @ApiProperty()
  RackPrincipalLimpieza: string;

  @IsString()
  @ApiProperty()
  RackPrincipalOrden: string;

  @IsString()
  @ApiProperty()
  FuncionamientoAP: string;
}
