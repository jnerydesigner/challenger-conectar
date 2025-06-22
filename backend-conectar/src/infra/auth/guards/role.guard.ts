import { Role } from '@application/enums/role.enum';
import { ROLES_KEY } from '@infra/decorators/roles.decorator';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    console.log(context.getHandler());
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    console.log('User Roles', user);

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
