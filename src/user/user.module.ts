import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
  imports: [CurrencyModule, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
