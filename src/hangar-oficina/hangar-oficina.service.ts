import { Injectable } from '@nestjs/common';
import { CreateHangarOficinaDto } from './dto/create-hangar-oficina.dto';
import { UpdateHangarOficinaDto } from './dto/update-hangar-oficina.dto';

@Injectable()
export class HangarOficinaService {
  create(createHangarOficinaDto: CreateHangarOficinaDto) {
    return 'This action adds a new hangarOficina';
  }

  findAll() {
    return `This action returns all hangarOficina`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hangarOficina`;
  }

  update(id: number, updateHangarOficinaDto: UpdateHangarOficinaDto) {
    return `This action updates a #${id} hangarOficina`;
  }

  remove(id: number) {
    return `This action removes a #${id} hangarOficina`;
  }
}
