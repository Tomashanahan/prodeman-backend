import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTallerDto } from './dto/create-taller.dto';
import { UpdateTallerDto } from './dto/update-taller.dto';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Taller } from './entities/taller.entity';
import { CommonService } from '../common/common.service';

@Injectable()
export class TallerService {
  constructor(
    @InjectRepository(Taller)
    private readonly tallerRepository: Repository<Taller>,
    private readonly commonService: CommonService,
  ) {}

  async create(createTallerDto: CreateTallerDto, user: User) {
    try {
      const taller = this.tallerRepository.create({
        ...createTallerDto,
        user,
      });

      await this.tallerRepository.save(taller);
      return taller;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(user: User) {
    const taller = await this.commonService.findAll('taller', user, this.tallerRepository);
    return taller;
  }

  async findOne(id: string) {
    const taller = await this.commonService.findOne(id, this.tallerRepository);
    return taller;
  }

  async update(id: string, updateTallerDto: UpdateTallerDto) {
    try {
      const taller = await this.findOne(id);

      if (!taller) {
        throw new Error();
      } else {
        return this.tallerRepository.save({
          preference_id: taller.preference_id,
          ...updateTallerDto,
        });
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
