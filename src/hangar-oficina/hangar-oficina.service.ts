import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHangarOficinaDto } from './dto/create-hangar-oficina.dto';
import { UpdateHangarOficinaDto } from './dto/update-hangar-oficina.dto';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HangarOficina } from './entities/hangar-oficina.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HangarOficinaService {
  constructor(
    @InjectRepository(HangarOficina)
    private readonly hangarOficinaRepository: Repository<HangarOficina>,
  ) {}

  async create(createHangarOficinaDto: CreateHangarOficinaDto, user: User) {
    try {
      const hangarOficina = this.hangarOficinaRepository.create({
        ...createHangarOficinaDto,
        user,
      });

      await this.hangarOficinaRepository.save(hangarOficina);
      return hangarOficina;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      const hangarOficina = await this.hangarOficinaRepository.find();
      return { oficina: hangarOficina[0] };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const hangarOficina = await this.hangarOficinaRepository.findOneBy({
        preference_id: id,
      });
      return hangarOficina;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, updateHangarOficinaDto: UpdateHangarOficinaDto) {
    try {
      const hangarOficina = await this.findOne(id);

      if (!hangarOficina) {
        throw new Error();
      } else {
        return this.hangarOficinaRepository.save({
          preference_id: hangarOficina.preference_id,
          ...updateHangarOficinaDto,
        });
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
