import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCasaPrincipalDto } from './dto/create-casa-principal.dto';
import { UpdateCasaPrincipalDto } from './dto/update-casa-principal.dto';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CasaPrincipal } from './entities/casa-principal.entity';
import { Repository } from 'typeorm';
import { CommonService } from '../common/common.service';

@Injectable()
export class CasaPrincipalService {
  constructor(
    @InjectRepository(CasaPrincipal)
    private readonly casaPrincipalRepository: Repository<CasaPrincipal>,
    private readonly commonService: CommonService,
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

  async findAll(user: User) {
    const casaPrincipal = await this.commonService.findAll(
      'casaPrincipal',
      CasaPrincipal,
      user,
      this.casaPrincipalRepository,
    );
    return casaPrincipal;
  }

  async findOne(id: string) {
    const casaPrincipal = await this.commonService.findOne(
      id,
      this.casaPrincipalRepository,
    );
    return casaPrincipal;
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
