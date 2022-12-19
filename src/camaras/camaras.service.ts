import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCamaraDto } from './dto/create-camara.dto';
import { UpdateCamaraDto } from './dto/update-camara.dto';
import { Camara } from './entities/camara.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class CamarasService {
  constructor(
    @InjectRepository(Camara)
    private readonly camaraRepository: Repository<Camara>,
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

  async findAll() {
    try {
      const camaras = await this.camaraRepository.find();
      return { camaras: camaras[0] };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const camaras = await this.camaraRepository.findOneBy({
        preference_id: id,
      });
      return camaras;
    } catch (error) {
      throw new BadRequestException(error);
    }
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
