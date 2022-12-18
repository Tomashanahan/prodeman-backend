import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class CasaPrincipal {
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
  FuncionamientoAP: string;

  @Column('text')
  @ApiProperty()
  FuncionamientoTelefono: string;

  @Column('text')
  @ApiProperty()
  UPS: string;

  @ManyToOne(() => User, (user) => user.casaPrincipal)
  user: User;
}
