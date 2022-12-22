import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/index';
import { JwtService } from '@nestjs/jwt';
import { v2 } from 'cloudinary';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(CreateUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(CreateUserDto);
      await this.userRepository.save(user);
      return {
        id: user.id,
        email: user.email,
        token: this.getJwt({ id: user.id }),
      };
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const cloudinaryConfig = v2.config({
        cloud_name: process.env.CLOUDNAME,
        api_key: process.env.CLOUDAPIKEY,
        api_secret: process.env.CLOUDINARYSECRET,
        secure: true,
      });
      const timestamp = Math.round(new Date().getTime() / 1000);
      const signature = v2.utils.api_sign_request(
        {
          timestamp: timestamp,
        },
        cloudinaryConfig.api_secret,
      );
      const { email, password } = loginUserDto;
      const user = await this.userRepository.findOne({
        where: { email },
        select: {
          id: true,
          password: true,
          email: true,
          rol: true,
          team: true,
        },
      });

      if (!user)
        throw new UnauthorizedException(`Credentials are not valid (email)`);
      if (!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException(`Credentials are not valid (password)`);

      return {
        id: user.id,
        email: user.email,
        rol: user.rol,
        team: user.team,
        token: this.getJwt({ id: user.id }),
        cloudinaryInfo: { timestamp, signature },
      };
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  async checkAuthStatus(user: User) {
    return { ...user, token: this.getJwt({ id: user.id }) };
  }

  private getJwt(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDbErrors(error): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    } else {
      throw new InternalServerErrorException('Check the logs please');
    }
  }
}
