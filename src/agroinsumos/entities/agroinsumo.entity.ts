import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Agroinsumo {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  preference_id: string;

  @Column('text')
  @ApiProperty()
  FuncionamientoAP: string;

  @ManyToOne(() => User, (user) => user.agroinsumo)
  user: User;
}
