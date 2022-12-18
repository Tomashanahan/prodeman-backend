import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Balanza {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  preference_id: string;

  @Column('text')
  @ApiProperty()
  RackPrincipalLimpieza: string;

  @Column('text')
  @ApiProperty()
  RackPrincipalOrden: string;

  @Column('text')
  @ApiProperty()
  LimpiarPC: string;

  @Column('text')
  @ApiProperty()
  FuncionamientoAP: string;

  @Column('text')
  @ApiProperty()
  UPS: string;

  @Column('text')
  @ApiProperty()
  FuncionamientoTelefono: string;

  @ManyToOne(() => User, (user) => user.balanza)
  user: User;
}