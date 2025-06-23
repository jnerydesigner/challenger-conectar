import { AuthModule } from './auth.module';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AppService } from '@application/services/app.service';
import { AppController } from '@presenters/app.controller';
import { HealthCheckModule } from './health-check.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { env } from '@infra/constants/zod-env.constant';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@infra/auth/guards/jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.DATABASE_HOST_NAME,
      port: env.POSTGRES_PORT,
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB,
      synchronize: true,
      autoLoadEntities: true,
      logging: false,
    }),
    UserModule,
    HealthCheckModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
