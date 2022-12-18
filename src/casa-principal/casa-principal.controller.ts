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

@ApiTags('Casa principal')
@Controller('casa-principal')
export class CasaPrincipalController {
  constructor(private readonly casaPrincipalService: CasaPrincipalService) {}

  @Post()
  create(@Body() createCasaPrincipalDto: CreateCasaPrincipalDto) {
    return this.casaPrincipalService.create(createCasaPrincipalDto);
  }

  @Get()
  findAll() {
    return this.casaPrincipalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.casaPrincipalService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCasaPrincipalDto: UpdateCasaPrincipalDto,
  ) {
    return this.casaPrincipalService.update(+id, updateCasaPrincipalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.casaPrincipalService.remove(+id);
  }
}
