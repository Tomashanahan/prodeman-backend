import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExAgroinsumosService } from './ex-agroinsumos.service';
import { CreateExAgroinsumoDto } from './dto/create-ex-agroinsumo.dto';
import { UpdateExAgroinsumoDto } from './dto/update-ex-agroinsumo.dto';

@Controller('ex-agroinsumos')
export class ExAgroinsumosController {
  constructor(private readonly exAgroinsumosService: ExAgroinsumosService) {}

  @Post()
  create(@Body() createExAgroinsumoDto: CreateExAgroinsumoDto) {
    return this.exAgroinsumosService.create(createExAgroinsumoDto);
  }

  @Get()
  findAll() {
    return this.exAgroinsumosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exAgroinsumosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExAgroinsumoDto: UpdateExAgroinsumoDto) {
    return this.exAgroinsumosService.update(+id, updateExAgroinsumoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exAgroinsumosService.remove(+id);
  }
}
