import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Camara {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  preference_id: string;

  @Column()
  @ApiProperty()
  ChequearVisualizacion: string;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeUpdate()
  update() {
    this.updated_at = new Date();
  }

  @ManyToOne(() => User, (user) => user.camara, {
    cascade: true,
    eager: true, // ⬅️ this is to get all the relations when you make a get
  })
  user: User;
}
