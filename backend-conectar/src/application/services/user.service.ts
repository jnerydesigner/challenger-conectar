import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@domain/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@application/dtos/create-user.dto';
import { passwordHash } from '@infra/utils/password-hash.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(user: CreateUserDto) {
    const existsUser = await this.findOneEmail(user.email);

    if (existsUser) {
      throw new Error('Exists user');
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

  findAll() {
    return this.usersRepository.find();
  }
}
