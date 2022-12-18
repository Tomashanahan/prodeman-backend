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
import { AgroinsumosService } from './agroinsumos.service';
import { CreateAgroinsumoDto } from './dto/create-agroinsumo.dto';
import { UpdateAgroinsumoDto } from './dto/update-agroinsumo.dto';

@ApiTags('Agroinsumos')
@Controller('agroinsumos')
export class AgroinsumosController {
  constructor(private readonly agroinsumosService: AgroinsumosService) {}

  @Post()
  create(@Body() createAgroinsumoDto: CreateAgroinsumoDto) {
    return this.agroinsumosService.create(createAgroinsumoDto);
  }

  @Get()
  findAll() {
    return this.agroinsumosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agroinsumosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAgroinsumoDto: UpdateAgroinsumoDto,
  ) {
    return this.agroinsumosService.update(+id, updateAgroinsumoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agroinsumosService.remove(+id);
  }
}
