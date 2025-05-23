import { Module } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { UsersService } from './users.service';
import { UserController } from './presentation/controllers/user.controller';
import { UserService } from './domain/services/user.service';
import { UserRepositoryInterface } from './domain/repositories/user-repository.interface';
import { UserRepository } from './infrastructure/persistence/repositories/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    UsersService,
    UserService,
    {
      provide: UserRepositoryInterface,
      useClass: UserRepository,
    },
    DatabaseService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
