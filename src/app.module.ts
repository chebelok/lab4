import { Module } from '@nestjs/common';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { RecordModule } from './record/record.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category/entities/category.entity';
import { User } from './user/entities/user.entity';
import { Record } from './record/entities/record.entity';
import { CurrencyModule } from './currency/currency.module';
import { Currency } from './currency/entities/currency.entity';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    HealthcheckModule,
    UserModule,
    CategoryModule,
    RecordModule,
    CurrencyModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      ssl: false,
      synchronize: true,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [Category, User, Record, Currency],
    }),
  ],
})
export class AppModule {}
