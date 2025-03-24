import { Controller, Get } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { BearerAuth } from '../auth/decorator/bearer-auth.decorator';

@Controller('users')
@BearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async findAll() {
    return await this.usersService.findAll();
  }
}
