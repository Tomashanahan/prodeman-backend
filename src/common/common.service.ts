import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class CommonService {
  async findAll(
    nameOfTheService: string,
    entity,
    user: User,
    entityRepository,
  ) {
    try {
      let results: typeof entity;
      if (user.rol.includes('admin')) {
        results = await entityRepository.find({
          where: {
            user: {
              id: user.id,
            },
          },
        });

        return { [nameOfTheService]: results };
      } else {
        results = await entityRepository.find({
          where: {
            user: {
              id: user.id,
            },
          },
          select: {
            user: false,
          },
        });

        // res
        return { [nameOfTheService]: results[0] };
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string, entityRepository) {
    try {
      const result = await entityRepository.findOneBy({
        preference_id: id,
      });
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
