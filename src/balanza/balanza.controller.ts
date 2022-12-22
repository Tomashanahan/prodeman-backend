import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { BalanzaService } from './balanza.service';
import { CreateBalanzaDto } from './dto/create-balanza.dto';
import { UpdateBalanzaDto } from './dto/update-balanza.dto';
import { User } from '../auth/entities/user.entity';

@ApiTags('Balanza')
@Controller('balanza')
export class BalanzaController {
  constructor(
    @Inject(forwardRef(() => BalanzaService))
    private readonly balanzaService: BalanzaService,
  ) {}

  @Post()
  @Auth()
  @ApiProperty()
  create(@Body() createBalanzaDto: CreateBalanzaDto, @GetUser() user: User) {
    return this.balanzaService.create(createBalanzaDto, user);
  }

  @Get()
  @Auth()
  @ApiProperty()
  findAll(@GetUser() user: User) {
    return this.balanzaService.findAll(user);
  }

  @Get(':id')
  @Auth()
  @ApiProperty()
  findOne(@Param('id') id: string) {
    return this.balanzaService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  @ApiProperty()
  update(@Param('id') id: string, @Body() updateBalanzaDto: UpdateBalanzaDto) {
    return this.balanzaService.update(id, updateBalanzaDto);
  }
}
