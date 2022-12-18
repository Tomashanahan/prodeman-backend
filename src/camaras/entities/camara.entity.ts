import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Camara {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  preference_id: string;

  @Column()
  @ApiProperty()
  ChequearVisualizacion: string;

  @ManyToOne(() => User, (user) => user.camara)
  user: User;
}
