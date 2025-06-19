import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from '@application/services/user.service';
import { CreateUserDto } from '@application/dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
