import { AuthController } from '@presenters/auth/auth.controller';
import { AuthService } from '@application/services/auth.service';
import { LoginDTO } from '@application/dtos/login.dto';
import { Response } from 'express';

describe('AuthController', () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;
  let res: Response;

  beforeEach(() => {
    service = { signIn: jest.fn() } as any;
    controller = new AuthController(service);
    res = { cookie: jest.fn() } as any;
  });

  it('should login and set cookie', async () => {
    const body: LoginDTO = { username: 'john', password: '123' };
    const token = { accessToken: 'token' };
    service.signIn.mockResolvedValue(token);

    const result = await controller.login(body, res);

    expect(service.signIn).toHaveBeenCalledWith('john', '123');
    expect(res.cookie).toHaveBeenCalledWith('access_token', token, expect.any(Object));
    expect(result).toEqual({ message: 'Login successful' });
  });

  it('should throw when service throws', async () => {
    const body: LoginDTO = { username: 'john', password: '123' };
    service.signIn.mockRejectedValue(new Error('invalid'));

    await expect(controller.login(body, res)).rejects.toThrow('invalid');
  });
});
