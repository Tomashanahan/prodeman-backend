import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCasaPrincipalDto } from './dto/create-casa-principal.dto';
import { UpdateCasaPrincipalDto } from './dto/update-casa-principal.dto';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CasaPrincipal } from './entities/casa-principal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CasaPrincipalService {
  constructor(
    @InjectRepository(CasaPrincipal)
    private readonly casaPrincipalRepository: Repository<CasaPrincipal>,
  ) {}

  async create(createCasaPrincipalDto: CreateCasaPrincipalDto, user: User) {
    try {
      const casaPrincipal = this.casaPrincipalRepository.create({
        ...createCasaPrincipalDto,
        user,
      });

      await this.casaPrincipalRepository.save(casaPrincipal);
      return casaPrincipal;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      const casaPrincipal = await this.casaPrincipalRepository.find();
      return { casaPrincipal: casaPrincipal[0] };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const casaPrincipal = await this.casaPrincipalRepository.findOneBy({
        preference_id: id,
      });
      return casaPrincipal;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, updateCasaPrincipalDto: UpdateCasaPrincipalDto) {
    try {
      const casaPrincipal = await this.findOne(id);

      if (!casaPrincipal) {
        throw new Error();
      } else {
        return this.casaPrincipalRepository.save({
          preference_id: casaPrincipal.preference_id,
          ...updateCasaPrincipalDto,
        });
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
