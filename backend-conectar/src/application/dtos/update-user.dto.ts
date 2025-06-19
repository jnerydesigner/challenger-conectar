import { UserRole } from '@domain/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Insert Name' })
  name?: string;

  @ApiProperty({ example: 'john.doe@test.com', description: 'Insert Email' })
  email?: string;

  @ApiProperty({ example: '123456', description: 'Insert Your Password' })
  password?: string;

  @ApiProperty({ example: 'user', description: 'Insert Role admin or user' })
  role?: UserRole;
}
