import { Injectable } from '@nestjs/common';
import { CreateHangarDto } from './dto/create-hangar.dto';
import { UpdateHangarDto } from './dto/update-hangar.dto';

@Injectable()
export class HangarService {
  create(createHangarDto: CreateHangarDto) {
    return 'This action adds a new hangar';
  }

  findAll() {
    return `This action returns all hangar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hangar`;
  }

  update(id: number, updateHangarDto: UpdateHangarDto) {
    return `This action updates a #${id} hangar`;
  }

  remove(id: number) {
    return `This action removes a #${id} hangar`;
  }
}
