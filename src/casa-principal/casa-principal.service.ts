import { Injectable } from '@nestjs/common';
import { CreateCasaPrincipalDto } from './dto/create-casa-principal.dto';
import { UpdateCasaPrincipalDto } from './dto/update-casa-principal.dto';

@Injectable()
export class CasaPrincipalService {
  create(createCasaPrincipalDto: CreateCasaPrincipalDto) {
    return 'This action adds a new casaPrincipal';
  }

  findAll() {
    return `This action returns all casaPrincipal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} casaPrincipal`;
  }

  update(id: number, updateCasaPrincipalDto: UpdateCasaPrincipalDto) {
    return `This action updates a #${id} casaPrincipal`;
  }

  remove(id: number) {
    return `This action removes a #${id} casaPrincipal`;
  }
}
