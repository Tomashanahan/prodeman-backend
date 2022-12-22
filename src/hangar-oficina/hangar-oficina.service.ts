import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHangarOficinaDto } from './dto/create-hangar-oficina.dto';
import { UpdateHangarOficinaDto } from './dto/update-hangar-oficina.dto';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HangarOficina } from './entities/hangar-oficina.entity';
import { Repository } from 'typeorm';
import { CommonService } from '../common/common.service';

@Injectable()
export class HangarOficinaService {
  constructor(
    @InjectRepository(HangarOficina)
    private readonly hangarOficinaRepository: Repository<HangarOficina>,
    private readonly commonService: CommonService,
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

  async findAll(user: User) {
    const hangarOficina = await this.commonService.findAll(
      'hangarOficina',
      HangarOficina,
      user,
      this.hangarOficinaRepository,
    );
    return hangarOficina;
  }

  async findOne(id: string) {
    const hangarOficina = await this.commonService.findOne(
      id,
      this.hangarOficinaRepository,
    );
    return hangarOficina;
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
