import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BalanzaService } from './balanza.service';
import { CreateBalanzaDto } from './dto/create-balanza.dto';
import { UpdateBalanzaDto } from './dto/update-balanza.dto';

@Controller('balanza')
export class BalanzaController {
  constructor(private readonly balanzaService: BalanzaService) {}

  @Post()
  create(@Body() createBalanzaDto: CreateBalanzaDto) {
    return this.balanzaService.create(createBalanzaDto);
  }

  @Get()
  findAll() {
    return this.balanzaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.balanzaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBalanzaDto: UpdateBalanzaDto) {
    return this.balanzaService.update(+id, updateBalanzaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.balanzaService.remove(+id);
  }
}
