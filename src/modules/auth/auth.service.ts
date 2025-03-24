import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login({ userName, password }) {
    const user = await this.usersService.findOneWithPassword(
      userName,
      password,
    );

    const payload = {
        sub: userName,
        username: user.displayName,
      },
      access_token = this.jwtService.sign(payload);

    return {
      access_token,
    };
  }
}
