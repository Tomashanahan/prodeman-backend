import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBalanzaDto } from './dto/create-balanza.dto';
import { UpdateBalanzaDto } from './dto/update-balanza.dto';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Balanza } from './entities/balanza.entity';
import { Repository } from 'typeorm';
import { CommonService } from '../common/common.service';

@Injectable()
export class BalanzaService {
  constructor(
    @InjectRepository(Balanza)
    private readonly balanzaRepository: Repository<Balanza>,
    private readonly commonService: CommonService,
  ) {}

  async create(createBalanzaDto: CreateBalanzaDto, user: User) {
    try {
      const balanza = this.balanzaRepository.create({
        ...createBalanzaDto,
        user,
      });

      await this.balanzaRepository.save(balanza);
      return { Balanza: balanza };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(user: User) {
    const balanza = await this.commonService.findAll(
      'balanza',
      Balanza,
      user,
      this.balanzaRepository,
    );
    return balanza;
  }

  async findOne(id: string) {
    const balanza = await this.commonService.findOne(
      id,
      this.balanzaRepository,
    );
    return balanza;
  }

  async update(id: string, updateBalanzaDto: UpdateBalanzaDto) {
    try {
      const balanza = await this.findOne(id);

      if (!balanza) {
        throw new Error();
      } else {
        return this.balanzaRepository.save({
          preference_id: balanza.preference_id,
          ...updateBalanzaDto,
        });
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
