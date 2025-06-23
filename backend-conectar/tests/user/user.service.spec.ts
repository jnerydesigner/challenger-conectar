import { UserService } from '@application/services/user.service';
import { Users } from '@domain/entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let repo: jest.Mocked<Repository<Users>>;

  beforeEach(() => {
    repo = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      createQueryBuilder: jest.fn() as any,
    } as any;
    service = new UserService(repo as any);
  });

  describe('findOneEmail', () => {
    it('should return true when user exists', async () => {
      repo.findOne.mockResolvedValue({} as Users);
      const result = await service.findOneEmail('test@test.com');
      expect(result).toBe(true);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { email: 'test@test.com' } });
    });

    it('should return false when user does not exist', async () => {
      repo.findOne.mockResolvedValue(undefined);
      const result = await service.findOneEmail('none@test.com');
      expect(result).toBe(false);
    });
  });

  describe('findOne', () => {
    it('should return user when exists', async () => {
      const user = { id: 1 } as Users;
      repo.findOne.mockResolvedValue(user);
      const result = await service.findOne(1);
      expect(result).toBe(user);
    });

    it('should throw when user not found', async () => {
      repo.findOne.mockResolvedValue(undefined);
      await expect(service.findOne(1)).rejects.toBeInstanceOf(HttpException);
    });
  });
});
