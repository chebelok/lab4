import { Injectable } from '@nestjs/common';
import { HealthcheckDto } from './dto/healthcheck.dto';
import { Statuses } from './enums/statuses.enum';

@Injectable()
export class HealthcheckService {
  async getStatus(): Promise<HealthcheckDto> {
    const randomIndex = Math.floor((Math.random() * 3));

    return {
      status: Object.values(Statuses)[randomIndex],
      date: new Date()
    };
  }
}
