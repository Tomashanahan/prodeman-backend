import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBalanzaDto } from './dto/create-balanza.dto';
import { UpdateBalanzaDto } from './dto/update-balanza.dto';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Balanza } from './entities/balanza.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BalanzaService {
  constructor(
    @InjectRepository(Balanza)
    private readonly balanzaRepository: Repository<Balanza>,
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

  async findAll() {
    try {
      const balanza = await this.balanzaRepository.find();

      if (!balanza) throw new Error();
      else {
        return { balanza: balanza[0] };
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const balanza = this.balanzaRepository.findOneBy({ preference_id: id });

      if (!balanza) throw new Error();
      else {
        return balanza;
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
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
