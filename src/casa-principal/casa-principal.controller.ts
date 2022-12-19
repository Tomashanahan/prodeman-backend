import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CasaPrincipalService } from './casa-principal.service';
import { CreateCasaPrincipalDto } from './dto/create-casa-principal.dto';
import { UpdateCasaPrincipalDto } from './dto/update-casa-principal.dto';
import { User } from '../auth/entities/user.entity';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { Auth } from 'src/auth/decorator/auth.decorator';

@ApiTags('Casa principal')
@Controller('casa-principal')
export class CasaPrincipalController {
  constructor(private readonly casaPrincipalService: CasaPrincipalService) {}

  @Post()
  @Auth()
  create(
    @Body() createCasaPrincipalDto: CreateCasaPrincipalDto,
    @GetUser() user: User,
  ) {
    return this.casaPrincipalService.create(createCasaPrincipalDto, user);
  }

  @Get()
  @Auth()
  findAll() {
    return this.casaPrincipalService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.casaPrincipalService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body() updateCasaPrincipalDto: UpdateCasaPrincipalDto,
  ) {
    return this.casaPrincipalService.update(id, updateCasaPrincipalDto);
  }
}
