import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from 'src/users/user.entity';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.currentUser) {
      return false;
    }
    return request.currentUser.role === Role.admin;
  }
}
