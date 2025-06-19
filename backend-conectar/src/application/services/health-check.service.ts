import { IHealthCheckContract } from '@domain/contract/health-check.contract';

import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  constructor(private logger: Logger) {
    this.logger = new Logger(HealthCheckService.name);
  }

  getHealthCheck(): IHealthCheckContract {
    this.logger.log('Health check called');
    return { message: 'ok' };
  }
}
