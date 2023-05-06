import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

// 액세스 가능 여부
// 로그인 하지 않은 사용자 접근 방지
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const jwt = request.cookies['jwt'];

      return this.jwtService.verify(jwt) !== undefined;
    } catch (_) {
      return false;
    }
  }
}
