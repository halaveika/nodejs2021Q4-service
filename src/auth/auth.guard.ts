import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new UnauthorizedException({ message: 'Unauthorized user' });
      }

      const token = authorization.split(' ')[1];
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: 'Unauthorized user' });
    }
  }
}
