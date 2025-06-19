import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@domain/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@application/dtos/create-user.dto';
import { passwordHash } from '@infra/utils/password-hash.util';
import { UpdateUserDto } from '@application/dtos/update-user.dto';

@Injectable()
export class UserService {
  private logger: Logger;
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {
    this.logger = new Logger(UserService.name);
  }

  async create(user: CreateUserDto) {
    const existsUser = await this.findOneEmail(user.email);

    if (existsUser) {
      this.logger.error('User already exists');
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: 'User already exists',
          error: 'Conflict',
        },
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await passwordHash(user.password);

    const newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  async findOneEmail(email: string): Promise<boolean> {
    const existsUser = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (existsUser) {
      return true;
    }

    return false;
  }

  async findOne(id: number) {
    const existsUser = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!existsUser) {
      this.logger.error('User Not Found');
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User Not Found',
          error: 'NotFound',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    this.logger.log(JSON.stringify(existsUser));

    return existsUser;
  }

  findAll() {
    return this.usersRepository.find();
  }

  async update(id: number, userUpdateBody: UpdateUserDto) {
    const user = await this.findOne(id);
    let password: string = '';
    if (userUpdateBody.password) {
      password = await passwordHash(userUpdateBody.password);
    } else {
      password = user.password;
    }
    await this.usersRepository
      .createQueryBuilder()
      .update()
      .set({ ...user, ...userUpdateBody, password })
      .where('id = :id', { id })
      .execute();

    const userUpdated = await this.findOne(id);

    this.logger.log(JSON.stringify(JSON.stringify(userUpdated)));
    return userUpdated;
  }

  async delete(id: number) {
    await this.findOne(id);
    await this.usersRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
    this.logger.log(JSON.stringify('User deleted'));
  }

  async findOneLogin(email: string) {
    const existsUser = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!existsUser) {
      this.logger.error('User Not Found');
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User Not Found',
          error: 'NotFound',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    this.logger.log(JSON.stringify(existsUser));

    return existsUser;
  }
}
