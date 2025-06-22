import { HealthCheckController } from '@presenters/health-check/health-check.controller';
import { HealthCheckService } from '@application/services/health-check.service';
import { IHealthCheckContract } from '@domain/contract/health-check.contract';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;
  let service: jest.Mocked<HealthCheckService>;

  beforeEach(() => {
    service = { getHealthCheck: jest.fn() } as any;
    controller = new HealthCheckController(service);
  });

  it('should return health check info', () => {
    const data: IHealthCheckContract = { message: 'ok' };
    service.getHealthCheck.mockReturnValue(data);

    const result = controller.getHello();

    expect(result).toEqual(data);
    expect(service.getHealthCheck).toHaveBeenCalled();
  });

  it('should throw when service fails', () => {
    service.getHealthCheck.mockImplementation(() => {
      throw new Error('fail');
    });

    expect(() => controller.getHello()).toThrow('fail');
  });
});
