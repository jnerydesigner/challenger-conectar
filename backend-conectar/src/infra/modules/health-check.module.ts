import { HealthCheckService } from '@application/services/health-check.service';
import { Logger, Module } from '@nestjs/common';
import { HealthCheckController } from '@presenters/health-check/health-check.controller';

@Module({
  imports: [],
  controllers: [HealthCheckController],
  providers: [HealthCheckService, Logger],
})
export class HealthCheckModule {}
