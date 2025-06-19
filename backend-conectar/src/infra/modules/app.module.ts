import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AppService } from '@application/services/app.service';
import { AppController } from '@presenters/app.controller';
import { HealthCheckModule } from './health-check.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    HealthCheckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
