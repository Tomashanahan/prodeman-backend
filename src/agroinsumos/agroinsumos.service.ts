import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAgroinsumoDto } from './dto/create-agroinsumo.dto';
import { UpdateAgroinsumoDto } from './dto/update-agroinsumo.dto';
import { Agroinsumo } from './entities/agroinsumo.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class AgroinsumosService {
  private readonly logger = new Logger('AgroinsumosService');

  constructor(
    @InjectRepository(Agroinsumo)
    private readonly agroinsumoRepository: Repository<Agroinsumo>,
  ) {}

  async create(createAgroinsumoDto: CreateAgroinsumoDto, user: User) {
    try {
      const agroinsumo = this.agroinsumoRepository.create({
        ...createAgroinsumoDto,
        user,
      });

      await this.agroinsumoRepository.save(agroinsumo);
      return agroinsumo;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      const agroinsumo = await this.agroinsumoRepository.find();
      return { agroinsumos: agroinsumo[0] };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const agroinsumo = await this.agroinsumoRepository.findOneBy({
        preference_id: id,
      });
      return agroinsumo;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, updateAgroinsumoDto: UpdateAgroinsumoDto) {
    try {
      const agroinsumo = await this.findOne(id);

      if (!agroinsumo) {
        throw new Error();
      } else {
        return this.agroinsumoRepository.save({
          preference_id: agroinsumo.preference_id,
          ...updateAgroinsumoDto,
        });
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
