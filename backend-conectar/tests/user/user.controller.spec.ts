import { UserController } from '@presenters/user/user.controller';
import { UserService } from '@application/services/user.service';
import { CreateUserDto } from '@application/dtos/create-user.dto';
import { UpdateUserDto } from '@application/dtos/update-user.dto';
import { PaginationResponseDTO } from '@application/dtos/response-pagination.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: jest.Mocked<UserService>;

  beforeEach(() => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;
    controller = new UserController(service);
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = {
      name: 'John',
      email: 'john@test.com',
      password: '123',
      role: 'user',
    };
    const expected = { id: 1 } as any;
    service.create.mockResolvedValue(expected);

    const result = await controller.create(dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toBe(expected);
  });

  it('should return paginated users', async () => {
    const query = { page: '2', limit: '5' };
    const expected: PaginationResponseDTO = {
      users: [],
      total: 0,
      page: 2,
      limit: 5,
      totalPages: 0,
    };
    service.findAll.mockResolvedValue(expected);

    const result = await controller.findAll(query);

    expect(service.findAll).toHaveBeenCalledWith(2, 5);
    expect(result).toBe(expected);
  });

  it('should return a single user', async () => {
    const expected = { id: 1 } as any;
    service.findOne.mockResolvedValue(expected);

    const result = await controller.findOne(1);

    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toBe(expected);
  });

  it('should update a user', async () => {
    const dto: UpdateUserDto = { name: 'Jane' };
    const expected = { id: 1, name: 'Jane' } as any;
    service.update.mockResolvedValue(expected);

    const result = await controller.updateUser(1, dto);

    expect(service.update).toHaveBeenCalledWith(1, dto);
    expect(result).toBe(expected);
  });

  it('should delete a user', async () => {
    service.delete.mockResolvedValue();

    const result = await controller.deleteUser(1);

    expect(service.delete).toHaveBeenCalledWith(1);
    expect(result).toEqual({ message: 'User Deleted Successfully' });
  });
});
