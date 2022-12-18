import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HangarOficinaService } from './hangar-oficina.service';
import { CreateHangarOficinaDto } from './dto/create-hangar-oficina.dto';
import { UpdateHangarOficinaDto } from './dto/update-hangar-oficina.dto';

@Controller('hangar-oficina')
export class HangarOficinaController {
  constructor(private readonly hangarOficinaService: HangarOficinaService) {}

  @Post()
  create(@Body() createHangarOficinaDto: CreateHangarOficinaDto) {
    return this.hangarOficinaService.create(createHangarOficinaDto);
  }

  @Get()
  findAll() {
    return this.hangarOficinaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hangarOficinaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHangarOficinaDto: UpdateHangarOficinaDto) {
    return this.hangarOficinaService.update(+id, updateHangarOficinaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hangarOficinaService.remove(+id);
  }
}
