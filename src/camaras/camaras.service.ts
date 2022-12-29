import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCamaraDto } from './dto/create-camara.dto';
import { UpdateCamaraDto } from './dto/update-camara.dto';
import { Camara } from './entities/camara.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CommonService } from '../common/common.service';

@Injectable()
export class CamarasService {
  constructor(
    @InjectRepository(Camara)
    private readonly camaraRepository: Repository<Camara>,
    private readonly commonService: CommonService,
  ) {}

  async create(createCamaraDto: CreateCamaraDto, user: User) {
    try {
      const camaras = this.camaraRepository.create({
        ...createCamaraDto,
        user,
      });

      await this.camaraRepository.save(camaras);
      return camaras;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(user: User) {
    const camaras = await this.commonService.findAll('camaras', user, this.camaraRepository);
    return camaras;
  }

  async findOne(id: string) {
    const camaras = await this.commonService.findOne(id, this.camaraRepository);
    return camaras;
  }

  async update(id: string, updateCamaraDto: UpdateCamaraDto) {
    try {
      const camaras = await this.findOne(id);
      if (!camaras) {
        throw new Error();
      } else {
        return this.camaraRepository.save({
          preference_id: camaras.preference_id,
          ...updateCamaraDto,
        });
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
