import { AppController } from '@presenters/app.controller';
import { AppService } from '@application/services/app.service';

describe('AppController', () => {
  let controller: AppController;
  let service: jest.Mocked<AppService>;

  beforeEach(() => {
    service = { getHello: jest.fn().mockReturnValue('test') } as any;
    controller = new AppController(service);
  });

  it('should return value from service', () => {
    const result = controller.getHello();
    expect(result).toBe('test');
    expect(service.getHello).toHaveBeenCalled();
  });
});
