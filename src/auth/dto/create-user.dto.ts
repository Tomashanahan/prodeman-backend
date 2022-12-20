import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserTeam } from '../interfaces';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: "The user's email address",
    example: 'example@example.com',
    type: 'string',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: "The user's full name",
    example: 'John Doe',
    type: 'string',
  })
  fullName: string;

  @IsEnum(UserTeam)
  @ApiProperty({
    description: "The user's team",
    example: "'Microinformatica' | 'Telecomunicaciones'",
    type: 'string',
  })
  team: 'Microinformatica' | 'Telecomunicaciones';

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  @ApiProperty({
    description: "The user's password",
    example: 'Password123',
    type: 'string',
  })
  password: string;
}
