import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCamaraDto {
  @IsString()
  @ApiProperty()
  ChequearVisualizacion: string;
}
