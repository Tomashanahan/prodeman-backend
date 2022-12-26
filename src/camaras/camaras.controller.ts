import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorator/auth.decorator';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { CamarasService } from './camaras.service';
import { CreateCamaraDto } from './dto/create-camara.dto';
import { UpdateCamaraDto } from './dto/update-camara.dto';
import { User } from '../auth/entities/user.entity';

@ApiTags('Camaras')
@Controller('camaras')
export class CamarasController {
  constructor(private readonly camarasService: CamarasService) {}

  @Post()
  @Auth()
  create(@Body() createCamaraDto: CreateCamaraDto, @GetUser() user: User) {
    return this.camarasService.create(createCamaraDto, user);
  }

  @Get()
  @Auth()
  findAll(@GetUser() user: User) {
    return this.camarasService.findAll(user);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.camarasService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateCamaraDto: UpdateCamaraDto) {
    return this.camarasService.update(id, updateCamaraDto);
  }
}
