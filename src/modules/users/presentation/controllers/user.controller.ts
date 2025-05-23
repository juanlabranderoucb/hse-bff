import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { BearerAuth } from 'src/modules/auth/decorator/bearer-auth.decorator';
import { UserService } from '../../domain/services/user.service';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { UpdateteUserDto } from '../../application/dtos/update-user.dto';

@Controller('users')
@BearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('/:userName')
  async findOne(@Param('userName') userName: string) {
    return await this.userService.findOne(userName);
  }

  @Post('/')
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @Put('/:userName')
  async update(
    @Param('userName') userName: string,
    @Body() body: UpdateteUserDto,
  ) {
    return await this.userService.update(userName, body);
  }

  @Delete('/:userName')
  async delete(@Param('userName') userName: string) {
    return await this.userService.delete(userName);
  }
}
