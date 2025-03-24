import { Body, Controller, Post } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { BearerAuth } from './decorator/bearer-auth.decorator';
import { User } from './decorator/user.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return await this.service.login(body);
  }

  @Post('/profile')
  @BearerAuth()
  async profile(@User() user) {
    return await this.usersService.findOne(user.userName);
  }
}
