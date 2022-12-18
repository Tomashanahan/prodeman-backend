import { Injectable } from '@nestjs/common';
import { CreateBalanzaDto } from './dto/create-balanza.dto';
import { UpdateBalanzaDto } from './dto/update-balanza.dto';

@Injectable()
export class BalanzaService {
  create(createBalanzaDto: CreateBalanzaDto) {
    return 'This action adds a new balanza';
  }

  findAll() {
    return `This action returns all balanza`;
  }

  findOne(id: number) {
    return `This action returns a #${id} balanza`;
  }

  update(id: number, updateBalanzaDto: UpdateBalanzaDto) {
    return `This action updates a #${id} balanza`;
  }

  remove(id: number) {
    return `This action removes a #${id} balanza`;
  }
}
