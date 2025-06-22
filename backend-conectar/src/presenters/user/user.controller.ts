import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '@application/services/user.service';
import { CreateUserDto } from '@application/dtos/create-user.dto';
import { UpdateUserDto } from '@application/dtos/update-user.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { PaginationQueryDTO } from '@application/dtos/pagination.dto';

import { RoleGuard } from '@infra/auth/guards/role.guard';
import { Role } from '@application/enums/role.enum';
import { Roles } from '@infra/decorators/roles.decorator';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @UseGuards(RoleGuard)
  @Roles(Role.Admin)
  @Get()
  findAll(@Query() query: PaginationQueryDTO) {
    return this.userService.findAll(
      parseInt(query.page),
      parseInt(query.limit),
    );
  }

  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the user to retrieve',
    example: 1,
  })
  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch('/:id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the user to update',
    example: 1,
  })
  updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the user to delete',
    example: 1,
  })
  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    await this.userService.delete(id);

    return {
      message: 'User Deleted Successfully',
    };
  }
}
