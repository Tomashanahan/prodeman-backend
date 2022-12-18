import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HangarService } from './hangar.service';
import { CreateHangarDto } from './dto/create-hangar.dto';
import { UpdateHangarDto } from './dto/update-hangar.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Hangar')
@Controller('hangar')
export class HangarController {
  constructor(private readonly hangarService: HangarService) {}

  @Post()
  create(@Body() createHangarDto: CreateHangarDto) {
    return this.hangarService.create(createHangarDto);
  }

  @Get()
  findAll() {
    return this.hangarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hangarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHangarDto: UpdateHangarDto) {
    return this.hangarService.update(+id, updateHangarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hangarService.remove(+id);
  }
}
