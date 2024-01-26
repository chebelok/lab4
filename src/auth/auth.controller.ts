import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: CreateUserDto) {
    const token = await this.authService.signUp(signUpDto);

    return { token };
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    const token = await this.authService.signIn(signInDto);

    return { token };;
  }
}
