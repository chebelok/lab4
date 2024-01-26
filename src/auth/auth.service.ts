import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';

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

  async signIn(payload: SignInDto) {
    const user = await this.userService.findOneByName(payload.name);

    if (!user) {
      throw new Error('user does not exist');
    }

    const isPasswordCorrect = await bcrypt.compare(
      payload.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error('incorrect password');
    }

    const token = await this.jwtService.signAsync(
      { id: user.id }, 
      { expiresIn: '24h' }
    );

    return token;
  }
}
