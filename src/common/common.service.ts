import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { DomainEntity } from './common.type';

@Injectable()
export class CommonService {
  async findAll(nameOfTheService: string, _user: User, entityRepository: Repository<DomainEntity>) {
    try {
      if (_user.rol.includes('admin')) {
        const results = await entityRepository.find({
          where: {
            user: {
              id: _user.id,
            },
          },
          order: {
            updated_at: 'DESC',
          },
        });

        return { [nameOfTheService]: results };
      } else {
        const results = await entityRepository.find({
          where: {
            user: {
              id: _user.id,
            },
          },
          order: {
            updated_at: 'DESC',
          },
        });

        return { [nameOfTheService]: results?.[0] };
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string, entityRepository) {
    try {
      const result = await entityRepository.findOne({
        where: { preference_id: id },
      });
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
