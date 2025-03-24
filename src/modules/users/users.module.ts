import { Module } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DatabaseService],
  exports: [UsersService],
})
export class UsersModule {}
