import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/modules/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService();
  const PORT = config.get<number>('SERVER_PORT', 3334);
  const logger = new Logger('Initial Application');
  const configSwagger = new DocumentBuilder()
    .setTitle('Conectar Authentication and Creation Users')
    .setDescription(
      'This is Documentation, api connect and Resource User, Authentication to Conecta',
    )
    .setVersion('1.0')
    .addTag('conecta')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(PORT, () => {
    logger.log(`Server Running in PORT = ${PORT}`);
  });
}
bootstrap();
