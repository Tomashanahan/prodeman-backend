import { Injectable } from '@nestjs/common';
import { CreateExAgroinsumoDto } from './dto/create-ex-agroinsumo.dto';
import { UpdateExAgroinsumoDto } from './dto/update-ex-agroinsumo.dto';

@Injectable()
export class ExAgroinsumosService {
  create(createExAgroinsumoDto: CreateExAgroinsumoDto) {
    return 'This action adds a new exAgroinsumo';
  }

  findAll() {
    return `This action returns all exAgroinsumos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exAgroinsumo`;
  }

  update(id: number, updateExAgroinsumoDto: UpdateExAgroinsumoDto) {
    return `This action updates a #${id} exAgroinsumo`;
  }

  remove(id: number) {
    return `This action removes a #${id} exAgroinsumo`;
  }
}
