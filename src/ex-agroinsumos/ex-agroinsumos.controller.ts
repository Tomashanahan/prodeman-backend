import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExAgroinsumosService } from './ex-agroinsumos.service';
import { CreateExAgroinsumoDto } from './dto/create-ex-agroinsumo.dto';
import { UpdateExAgroinsumoDto } from './dto/update-ex-agroinsumo.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from '../auth/entities/user.entity';

@ApiTags('Ex agroinsumos')
@Controller('ex-agroinsumos')
export class ExAgroinsumosController {
  constructor(private readonly exAgroinsumosService: ExAgroinsumosService) {}

  @Post()
  @Auth()
  create(
    @Body() createExAgroinsumoDto: CreateExAgroinsumoDto,
    @GetUser() user: User,
  ) {
    return this.exAgroinsumosService.create(createExAgroinsumoDto, user);
  }

  @Get()
  @Auth()
  findAll() {
    return this.exAgroinsumosService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.exAgroinsumosService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body() updateExAgroinsumoDto: UpdateExAgroinsumoDto,
  ) {
    return this.exAgroinsumosService.update(id, updateExAgroinsumoDto);
  }
}
