import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { HangarService } from './hangar.service';
import { CreateHangarDto } from './dto/create-hangar.dto';
import { UpdateHangarDto } from './dto/update-hangar.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorator/auth.decorator';
import { User } from '../auth/entities/user.entity';
import { GetUser } from '../auth/decorator/get-user.decorator';

@ApiTags('Hangar')
@Controller('hangar')
export class HangarController {
  constructor(private readonly hangarService: HangarService) {}

  @Post()
  @Auth()
  create(@Body() createHangarDto: CreateHangarDto, @GetUser() user: User) {
    return this.hangarService.create(createHangarDto, user);
  }

  @Get()
  @Auth()
  findAll(@GetUser() user: User) {
    return this.hangarService.findAll(user);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.hangarService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateHangarDto: UpdateHangarDto) {
    return this.hangarService.update(id, updateHangarDto);
  }
}
