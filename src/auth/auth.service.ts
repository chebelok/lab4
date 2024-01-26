import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor (
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async signUp(payload: CreateUserDto) {
    const user = await this.userService.findOneByName(payload.name);

    if (user) {
      throw new Error('user already exists');
    }

    const hash = await bcrypt.hash(payload.password, 10);

    const registered = await this.userService.create({
      password: hash,
      name: payload.name,
      defaultCurrencyCode: payload.defaultCurrencyCode
    });

    const token = await this.jwtService.signAsync(
      { id: registered.id }, 
      { expiresIn: '24h' }
    );

    return token;
  }

  async signIn(sinnInDto: SignInDto) {
    return `This action returns all auth`;
  }
}
