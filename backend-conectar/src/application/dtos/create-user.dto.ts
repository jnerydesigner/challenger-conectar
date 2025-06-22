import { UserRole } from '@domain/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Insert Name' })
  name: string;

  @ApiProperty({ example: 'john.doe@test.com', description: 'Insert Email' })
  email: string;

  @ApiProperty({ example: 'J123456', description: 'Insert Your Password' })
  password: string;

  @ApiProperty({ example: 'user', description: 'Insert Role admin or user' })
  role?: UserRole;

  @ApiProperty({ example: 'picture', description: 'Insert Role admin or user' })
  pictureProvider?: string;

  @ApiProperty({
    example: 'provider',
    description: 'Insert Role admin or user',
  })
  providerId?: string;
}
