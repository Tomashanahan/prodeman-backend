import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserTeam } from '../interfaces/index';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column('text', { unique: true })
  @ApiProperty()
  email: string;

  @Column('text', { select: false })
  @ApiProperty()
  password: string;

  @Column('text')
  @ApiProperty()
  fullName: string;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  @ApiProperty()
  rol: string[];

  @Column({
    type: 'enum',
    enum: UserTeam,
  })
  @ApiProperty()
  team: 'Microinformatica' | 'Telecomunicaciones';

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
