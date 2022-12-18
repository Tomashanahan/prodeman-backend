import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CamarasService } from './camaras.service';
import { CreateCamaraDto } from './dto/create-camara.dto';
import { UpdateCamaraDto } from './dto/update-camara.dto';

@ApiTags('Camaras')
@Controller('camaras')
export class CamarasController {
  constructor(private readonly camarasService: CamarasService) {}

  @Post()
  create(@Body() createCamaraDto: CreateCamaraDto) {
    return this.camarasService.create(createCamaraDto);
  }

  @Get()
  findAll() {
    return this.camarasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.camarasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCamaraDto: UpdateCamaraDto) {
    return this.camarasService.update(+id, updateCamaraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.camarasService.remove(+id);
  }
}
