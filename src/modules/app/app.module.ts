import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { config } from 'src/config';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScReportModule } from '../safety/sc-report/sc-report.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      expandVariables: true,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ScReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
