import { Injectable } from '@nestjs/common';
import { CreateCamaraDto } from './dto/create-camara.dto';
import { UpdateCamaraDto } from './dto/update-camara.dto';

@Injectable()
export class CamarasService {
  create(createCamaraDto: CreateCamaraDto) {
    return 'This action adds a new camara';
  }

  findAll() {
    return `This action returns all camaras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} camara`;
  }

  update(id: number, updateCamaraDto: UpdateCamaraDto) {
    return `This action updates a #${id} camara`;
  }

  remove(id: number) {
    return `This action removes a #${id} camara`;
  }
}
