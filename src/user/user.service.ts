import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyService } from '../currency/currency.service';

@Injectable()
export class UserService {
  constructor(
    private currencyService: CurrencyService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const payload: CreateUserDto = {
      name: createUserDto.name,
      password: createUserDto.password
    };

    if (createUserDto.defaultCurrencyCode) {
      const currency = await this.currencyService.findOneByCode(
        createUserDto.defaultCurrencyCode,
      );

      Object.assign(payload, { defaultCurrency: currency });
    }

    const newUser = this.userRepository.create(payload);

    return this.userRepository.save(newUser);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOneByName(name: string) {
    const user = await this.userRepository.findOne({
      where: {
        name
      }
    });

    return user;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['defaultCurrency'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException('User not deleted');
    }

    return true;
  }
}
