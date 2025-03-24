import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { BearerAuth } from '../auth/decorator/bearer-auth.decorator';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateteUserDto } from './dto/update-user.dto';

@Controller('users')
@BearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('/:userName')
  async findOne(@Param('userName') userName: string) {
    return await this.usersService.findOne(userName);
  }

  @Post('/')
  async create(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }

  @Put('/:userName')
  async update(
    @Param('userName') userName: string,
    @Body() body: UpdateteUserDto,
  ) {
    return await this.usersService.update(userName, body);
  }

  @Delete('/:userName')
  async delete(@Param('userName') userName: string) {
    return await this.usersService.delete(userName);
  }
}
