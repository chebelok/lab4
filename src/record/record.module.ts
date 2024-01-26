import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './entities/record.entity';
import { CurrencyModule } from '../currency/currency.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [RecordController],
  providers: [RecordService],
  imports: [CurrencyModule, UserModule, TypeOrmModule.forFeature([Record])],
})
export class RecordModule {}
