import { Role } from '@application/enums/role.enum';
import { ROLES_KEY } from '@infra/decorators/roles.decorator';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  private logger: Logger;
  constructor(private reflector: Reflector) {
    this.logger = new Logger(RoleGuard.name);
  }
  canActivate(context: ExecutionContext): boolean {
    this.logger.log(context);
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
