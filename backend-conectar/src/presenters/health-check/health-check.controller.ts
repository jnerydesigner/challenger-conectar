import { HealthCheckService } from '@application/services/health-check.service';
import { IHealthCheckContract } from '@domain/contract/health-check.contract';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get('/health-check')
  getHello(): IHealthCheckContract {
    return this.healthCheckService.getHealthCheck();
  }
}
