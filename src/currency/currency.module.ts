import { Module, forwardRef } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from './entities/currency.entity';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService],
  exports: [CurrencyService],
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([Currency])],
})
export class CurrencyModule {}
