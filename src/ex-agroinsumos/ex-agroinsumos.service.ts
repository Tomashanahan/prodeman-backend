import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateExAgroinsumoDto } from './dto/create-ex-agroinsumo.dto';
import { UpdateExAgroinsumoDto } from './dto/update-ex-agroinsumo.dto';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ExAgroinsumo } from './entities/ex-agroinsumo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExAgroinsumosService {
  constructor(
    @InjectRepository(ExAgroinsumo)
    private readonly exAgroinsumoRepository: Repository<ExAgroinsumo>,
  ) {}

  async create(createExAgroinsumoDto: CreateExAgroinsumoDto, user: User) {
    try {
      const exAgroinsumo = this.exAgroinsumoRepository.create({
        ...createExAgroinsumoDto,
        user,
      });

      await this.exAgroinsumoRepository.save(exAgroinsumo);
      return exAgroinsumo;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      const exAgroinsumo = await this.exAgroinsumoRepository.find();
      return { exAgroinsumos: exAgroinsumo[0] };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const exAgroinsumo = await this.exAgroinsumoRepository.findOneBy({
        preference_id: id,
      });
      return exAgroinsumo;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, updateExAgroinsumoDto: UpdateExAgroinsumoDto) {
    try {
      const exAgroinsumo = await this.findOne(id);

      if (!exAgroinsumo) {
        throw new Error();
      } else {
        return this.exAgroinsumoRepository.save({
          preference_id: exAgroinsumo.preference_id,
          ...updateExAgroinsumoDto,
        });
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
