import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class HangarOficina {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  preference_id: string;

  @Column('text')
  @ApiProperty()
  FuncionamientoTelefono: string;

  @Column('text')
  @ApiProperty()
  LimpiarPC: string;

  @Column('text')
  @ApiProperty()
  AcomodarCables: string;

  @ManyToOne(() => User, (user) => user.hangarOficina, {
    cascade: true,
    eager: true, // ⬅️ this is to get all the relations when you make a get
  })
  user: User;
}
