import { NestFactory } from '@nestjs/core';

import { UserService } from '@application/services/user.service';
import { AppModule } from '@infra/modules/app.module';
import { users } from './data-users';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userService = app.get(UserService);

  const usersData = await users();

  for (const user of usersData) {
    const exists = await userService.findOneEmail(user.email);
    if (!exists) {
      await userService.create(user);
      console.log(`✅ Created: ${user.email}`);
    } else {
      console.log(`⚠️ Skipped (already exists): ${user.email}`);
    }
  }

  await app.close();
}

bootstrap();
