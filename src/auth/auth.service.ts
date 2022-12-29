import {
  BadRequestException,
  forwardRef,
  Inject,
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
import { AgroinsumosService } from '../agroinsumos/agroinsumos.service';
import { BalanzaService } from '../balanza/balanza.service';
import { CamarasService } from '../camaras/camaras.service';
import { CasaPrincipalService } from '../casa-principal/casa-principal.service';
import { ExAgroinsumosService } from '../ex-agroinsumos/ex-agroinsumos.service';
import { HangarService } from '../hangar/hangar.service';
import { HangarOficinaService } from '../hangar-oficina/hangar-oficina.service';
import { TallerService } from '../taller/taller.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,

    @Inject(forwardRef(() => AgroinsumosService))
    private readonly agroinsumosService: AgroinsumosService,
    @Inject(forwardRef(() => BalanzaService))
    private readonly balanzaService: BalanzaService,
    @Inject(forwardRef(() => CamarasService))
    private readonly camarasService: CamarasService,
    @Inject(forwardRef(() => CasaPrincipalService))
    private readonly casaPrincipalService: CasaPrincipalService,
    @Inject(forwardRef(() => ExAgroinsumosService))
    private readonly exAgroinsumosService: ExAgroinsumosService,
    @Inject(forwardRef(() => HangarService))
    private readonly hangarService: HangarService,
    @Inject(forwardRef(() => HangarOficinaService))
    private readonly hangarOficinaService: HangarOficinaService,
    @Inject(forwardRef(() => TallerService))
    private readonly tallerService: TallerService,
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

  async getUserForm(user: User) {
    try {
      const { agroinsumos } = await this.agroinsumosService.findAll(user);
      const { balanza } = await this.balanzaService.findAll(user);
      const { camaras } = await this.camarasService.findAll(user);
      const { casaPrincipal } = await this.casaPrincipalService.findAll(user);
      const { exAgroinsumo } = await this.exAgroinsumosService.findAll(user);
      const { hangar } = await this.hangarService.findAll(user);
      const { hangarOficina } = await this.hangarOficinaService.findAll(user);
      const { taller } = await this.tallerService.findAll(user);

      return {
        agroinsumos,
        balanza,
        camaras,
        casaPrincipal,
        exAgroinsumo,
        hangar,
        hangarOficina,
        taller,
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
        // select: {
        //   id: true,
        //   password: true,
        //   email: true,
        //   rol: true,
        //   team: true,
        // },
      });

      if (!user) throw new UnauthorizedException(`Credentials are not valid (email)`);
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

  async getAllInformation(user: User) {
    return this.getUserForm(user);
    // return { ...user, token: this.getJwt({ id: user.id }) };
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
