import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
  ) {}

  async create(createCurrencyDto: CreateCurrencyDto) {
    const currency = this.currencyRepository.create(createCurrencyDto);

    return this.currencyRepository.save(currency);
  }

  async findAll() {
    return this.currencyRepository.find();
  }

  async findOne(id: string) {
    const currency = this.currencyRepository.findOne({
      where: {
        id,
      },
    });

    if (!currency) {
      throw new Error('Currency not found');
    }

    return currency;
  }

  async findOneByCode(code: string) {
    const currency = this.currencyRepository.findOne({
      where: {
        code,
      },
    });

    if (!currency) {
      throw new Error('Currency not found');
    }

    return currency;
  }

  async remove(id: string) {
    const result = await this.currencyRepository.delete(id);

    if (!result.affected) {
      throw new Error('Currency not deleted');
    }

    return true;
  }
}
