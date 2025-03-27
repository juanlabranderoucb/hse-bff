import { Body, Controller, Get, Post } from '@nestjs/common';

import { BearerAuth } from '../../auth/decorator/bearer-auth.decorator';
import { User } from 'src/modules/auth/decorator/user.decorator';
import { ScReportService } from './sc-report.service';
import { CreateScReportDto } from './dto/create-sc-report.dto';

@Controller('screports')
@BearerAuth()
export class ScReportController {
  constructor(private readonly scReportService: ScReportService) {}

  @Get('/')
  async findAll() {
    return await this.scReportService.findAll();
  }

  @Post('/')
  async create(@Body() body: CreateScReportDto, @User() user) {
    console.log(user);
    return await this.scReportService.create(body, user);
  }
}
