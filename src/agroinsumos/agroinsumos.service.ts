import { Injectable } from '@nestjs/common';
import { CreateAgroinsumoDto } from './dto/create-agroinsumo.dto';
import { UpdateAgroinsumoDto } from './dto/update-agroinsumo.dto';

@Injectable()
export class AgroinsumosService {
  create(createAgroinsumoDto: CreateAgroinsumoDto) {
    return 'This action adds a new agroinsumo';
  }

  findAll() {
    return `This action returns all agroinsumos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agroinsumo`;
  }

  update(id: number, updateAgroinsumoDto: UpdateAgroinsumoDto) {
    return `This action updates a #${id} agroinsumo`;
  }

  remove(id: number) {
    return `This action removes a #${id} agroinsumo`;
  }
}
