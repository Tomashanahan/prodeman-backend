import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { HangarOficinaService } from './hangar-oficina.service';
import { CreateHangarOficinaDto } from './dto/create-hangar-oficina.dto';
import { UpdateHangarOficinaDto } from './dto/update-hangar-oficina.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorator/auth.decorator';
import { User } from '../auth/entities/user.entity';
import { GetUser } from '../auth/decorator/get-user.decorator';

@ApiTags('Hangar oficina')
@Controller('hangar-oficina')
export class HangarOficinaController {
  constructor(private readonly hangarOficinaService: HangarOficinaService) {}

  @Post()
  @Auth()
  create(@Body() createHangarOficinaDto: CreateHangarOficinaDto, @GetUser() user: User) {
    return this.hangarOficinaService.create(createHangarOficinaDto, user);
  }

  @Get()
  @Auth()
  findAll(@GetUser() user: User) {
    return this.hangarOficinaService.findAll(user);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.hangarOficinaService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateHangarOficinaDto: UpdateHangarOficinaDto) {
    return this.hangarOficinaService.update(id, updateHangarOficinaDto);
  }
}
