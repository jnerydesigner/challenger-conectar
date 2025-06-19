import { AuthModule } from './auth.module';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AppService } from '@application/services/app.service';
import { AppController } from '@presenters/app.controller';
import { HealthCheckModule } from './health-check.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5448,
      username: 'root',
      password: '123456',
      database: 'conectar_db',
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    UserModule,
    HealthCheckModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
