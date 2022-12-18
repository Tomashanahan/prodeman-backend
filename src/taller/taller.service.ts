import { Injectable } from '@nestjs/common';
import { CreateTallerDto } from './dto/create-taller.dto';
import { UpdateTallerDto } from './dto/update-taller.dto';

@Injectable()
export class TallerService {
  create(createTallerDto: CreateTallerDto) {
    return 'This action adds a new taller';
  }

  findAll() {
    return `This action returns all taller`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taller`;
  }

  update(id: number, updateTallerDto: UpdateTallerDto) {
    return `This action updates a #${id} taller`;
  }

  remove(id: number) {
    return `This action removes a #${id} taller`;
  }
}
