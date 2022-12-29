import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAgroinsumoDto } from './dto/create-agroinsumo.dto';
import { UpdateAgroinsumoDto } from './dto/update-agroinsumo.dto';
import { Agroinsumo } from './entities/agroinsumo.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CommonService } from '../common/common.service';

@Injectable()
export class AgroinsumosService {
  private readonly logger = new Logger('AgroinsumosService');

  constructor(
    @InjectRepository(Agroinsumo)
    private readonly agroinsumoRepository: Repository<Agroinsumo>,
    private readonly commonService: CommonService,
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

  async findAll(user: User) {
    const agroinsumos = await this.commonService.findAll('agroinsumos', user, this.agroinsumoRepository);
    return agroinsumos;
  }

  async findOne(id: string) {
    const agroinsumos = await this.commonService.findOne(id, this.agroinsumoRepository);
    return agroinsumos;
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
