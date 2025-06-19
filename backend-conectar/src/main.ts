import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/modules/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService();
  const PORT = config.get<number>('SERVER_PORT', 3334);
  const logger = new Logger('Initial Application');
  await app.listen(PORT, () => {
    logger.log(`Server Running in PORT = ${PORT}`);
  });
}
bootstrap();
