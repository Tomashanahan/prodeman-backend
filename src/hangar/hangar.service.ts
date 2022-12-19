import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHangarDto } from './dto/create-hangar.dto';
import { UpdateHangarDto } from './dto/update-hangar.dto';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Hangar } from './entities/hangar.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HangarService {
  constructor(
    @InjectRepository(Hangar)
    private readonly hangarRepository: Repository<Hangar>,
  ) {}

  async create(createHangarDto: CreateHangarDto, user: User) {
    try {
      const hangar = this.hangarRepository.create({
        ...createHangarDto,
        user,
      });

      await this.hangarRepository.save(hangar);
      return hangar;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      const hangar = await this.hangarRepository.find();
      return { hangar: hangar[0] };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const hangar = await this.hangarRepository.findOneBy({
        preference_id: id,
      });
      return hangar;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, updateHangarDto: UpdateHangarDto) {
    try {
      const hangar = await this.findOne(id);

      if (!hangar) {
        throw new Error();
      } else {
        return this.hangarRepository.save({
          preference_id: hangar.preference_id,
          ...updateHangarDto,
        });
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
