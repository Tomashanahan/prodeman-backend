import { Controller, Get, Post, Body, Patch, Param, Inject, forwardRef } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorator/auth.decorator';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { AgroinsumosService } from './agroinsumos.service';
import { CreateAgroinsumoDto } from './dto/create-agroinsumo.dto';
import { UpdateAgroinsumoDto } from './dto/update-agroinsumo.dto';
import { User } from '../auth/entities/user.entity';

@ApiTags('Agroinsumos')
@Controller('agroinsumos')
export class AgroinsumosController {
  constructor(
    @Inject(forwardRef(() => AgroinsumosService))
    private readonly agroinsumosService: AgroinsumosService,
  ) {}

  @Post()
  @Auth()
  create(@Body() createAgroinsumoDto: CreateAgroinsumoDto, @GetUser() user: User) {
    return this.agroinsumosService.create(createAgroinsumoDto, user);
  }

  @Get()
  @Auth()
  findAll(@GetUser() user: User) {
    return this.agroinsumosService.findAll(user);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.agroinsumosService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateAgroinsumoDto: UpdateAgroinsumoDto) {
    return this.agroinsumosService.update(id, updateAgroinsumoDto);
  }
}
