import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  async signUp(signUpDto: SignUpDto) {
    return 'This action adds a new auth';
  }

  async signIn(sinnInDto: SignInDto) {
    return `This action returns all auth`;
  }
}
