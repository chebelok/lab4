import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './entities/record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyService } from '../currency/currency.service';
import { UserService } from '../user/user.service';

@Injectable()
export class RecordService {
  constructor(
    private readonly userService: UserService,
    private readonly currencyService: CurrencyService,
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,
  ) {}

  async create(createRecordDto: CreateRecordDto) {
    const payload = {
      amount: createRecordDto.amount,
      user: {
        id: createRecordDto.userId,
      },
      category: {
        id: createRecordDto.categoryId,
      },
    };

    if (createRecordDto.currencyCode) {
      const currency = await this.currencyService.findOneByCode(
        createRecordDto.currencyCode,
      );

      Object.assign(payload, { currency });
    } else {
      const user = await this.userService.findOne(createRecordDto.userId);

      Object.assign(payload, { currency: user.defaultCurrency });
    }

    const newRecord = this.recordRepository.create(payload);

    return this.recordRepository.save(newRecord);
  }

  async findAll() {
    return this.recordRepository.find({
      relations: ['user', 'category'],
    });
  }

  async findOne(id: string) {
    const record = await this.recordRepository.findOne({
      relations: ['user', 'category'],
      where: {
        id,
      },
    });

    if (!record) {
      throw new NotFoundException('Record not found');
    }
    return record;
  }

  async remove(id: string) {
    const result = await this.recordRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException('Record not found');
    }

    return true;
  }
}
