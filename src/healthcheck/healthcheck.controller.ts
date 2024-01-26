import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';
import { Endpoints } from './enums/endpoints.enum';
import { HealthcheckDto } from './dto/healthcheck.dto';

@Controller(Endpoints.HEALTHCHECK)
export class HealthcheckController {
  constructor(private readonly healthcheckService: HealthcheckService) {}
  @Get()
  getStatus(): Promise<HealthcheckDto> {
    return this.healthcheckService.getStatus();
  }
}
