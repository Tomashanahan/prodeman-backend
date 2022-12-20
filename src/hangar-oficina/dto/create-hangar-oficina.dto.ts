import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateHangarOficinaDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'Working',
    description: 'Indicates if the telephone is working',
  })
  FuncionamientoTelefono: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'Clean',
    description: 'Indicates if the PC is clean',
  })
  LimpiarPC: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'Arranged',
    description: 'Indicates if the cables are properly arranged',
  })
  AcomodarCables: string;
}
