import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateExAgroinsumoDto } from './dto/create-ex-agroinsumo.dto';
import { UpdateExAgroinsumoDto } from './dto/update-ex-agroinsumo.dto';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ExAgroinsumo } from './entities/ex-agroinsumo.entity';
import { Repository } from 'typeorm';
import { CommonService } from '../common/common.service';

@Injectable()
export class ExAgroinsumosService {
  constructor(
    @InjectRepository(ExAgroinsumo)
    private readonly exAgroinsumoRepository: Repository<ExAgroinsumo>,
    private readonly commonService: CommonService,
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

  async findAll(user: User) {
    const exAgroinsumo = await this.commonService.findAll(
      'exAgroinsumo',
      ExAgroinsumo,
      user,
      this.exAgroinsumoRepository,
    );
    return exAgroinsumo;
  }

  async findOne(id: string) {
    const exAgroinsumo = await this.commonService.findOne(
      id,
      this.exAgroinsumoRepository,
    );
    return exAgroinsumo;
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
