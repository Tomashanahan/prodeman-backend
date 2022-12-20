import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCamaraDto {
  @IsString()
  @ApiProperty({
    description: 'Chequear visualizacion de la camera',
    type: 'string',
  })
  ChequearVisualizacion: string;
}
