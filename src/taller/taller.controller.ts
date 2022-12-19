import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TallerService } from './taller.service';
import { CreateTallerDto } from './dto/create-taller.dto';
import { UpdateTallerDto } from './dto/update-taller.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { User } from '../auth/entities/user.entity';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@ApiTags('Taller')
@Controller('taller')
export class TallerController {
  constructor(private readonly tallerService: TallerService) {}

  @Post()
  @Auth()
  create(@Body() createTallerDto: CreateTallerDto, @GetUser() user: User) {
    return this.tallerService.create(createTallerDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.tallerService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.tallerService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateTallerDto: UpdateTallerDto) {
    return this.tallerService.update(id, updateTallerDto);
  }
}
