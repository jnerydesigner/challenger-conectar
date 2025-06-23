import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { UserController } from '@presenters/user/user.controller';
import { UserService } from '@application/services/user.service';
import { Users } from '@domain/entities/user.entity';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let service: Partial<Record<keyof UserService, jest.Mock>>;

  beforeEach(async () => {
    service = {
      findOne: jest.fn().mockResolvedValue({ id: 1 } as Users),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: service }],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/users/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect({ id: 1 });
  });
});
