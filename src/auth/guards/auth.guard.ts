import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  public async canActivate(context: ExecutionContext) {
    const authorizationHeader = context.switchToHttp().getRequest()
        .headers.authorization;

    if (!authorizationHeader) {
      throw new Error('auth header not found');
    }

    const token = authorizationHeader.split(' ')[1];

    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET
    });

    if (!payload) {
      throw new Error('invalid token');
    }

    const user = await this.userService.findOne(payload.id)

    if (!user) {
      throw new Error('user not found');
    }

    return true;
  }
}