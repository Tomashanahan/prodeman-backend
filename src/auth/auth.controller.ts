import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Auth } from './decorator/auth.decorator';
import { GetUser } from './decorator/get-user.decorator';
import { LoginUserDto } from './dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces/valid-roles';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    type: User,
  })
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-auth-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('user-form')
  @Auth(ValidRoles.user)
  userForm(@GetUser() user: User) {
    return this.authService.userForm(user);
  }

  @Get('get-all-information')
  @Auth(ValidRoles.admin)
  getAllInformation(@GetUser() user: User) {
    return this.authService.getAllInformation(user);
  }
}
