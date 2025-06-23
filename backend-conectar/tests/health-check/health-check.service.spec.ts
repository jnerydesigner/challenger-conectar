import { HealthCheckService } from '@application/services/health-check.service';
import { Logger } from '@nestjs/common';

describe('HealthCheckService', () => {
  let service: HealthCheckService;

  beforeEach(() => {
    service = new HealthCheckService(new Logger());
    jest.spyOn(Logger.prototype, 'log').mockImplementation();
  });

  it('should return ok and log message', () => {
    const result = service.getHealthCheck();
    expect(result).toEqual({ message: 'ok' });
    expect(Logger.prototype.log).toHaveBeenCalledWith('Health check called');
  });
});
