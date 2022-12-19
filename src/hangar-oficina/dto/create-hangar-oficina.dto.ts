import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateHangarOficinaDto {
  @IsString()
  @ApiProperty()
  FuncionamientoTelefono: string;

  @IsString()
  @ApiProperty()
  LimpiarPC: string;

  @IsString()
  @ApiProperty()
  AcomodarCables: string;
}
