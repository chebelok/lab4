import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { CurrencyModule } from 'src/currency/currency.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule]
})
export class AuthModule {}
