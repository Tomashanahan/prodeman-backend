import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtector } from './role-protector.decorator';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';
import { ValidRoles } from '../interfaces/valid-roles';

export const Auth = (...roles: ValidRoles[]) => {
  return applyDecorators(
    RoleProtector(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
};
