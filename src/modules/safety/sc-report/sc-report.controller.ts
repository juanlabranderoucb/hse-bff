import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { BearerAuth } from '../../auth/decorator/bearer-auth.decorator';
import { User } from 'src/modules/auth/decorator/user.decorator';
import { ScReportService } from './sc-report.service';
import { CreateScReportDto } from './dto/create-sc-report.dto';
import { ScReportImpactService } from './sc-report-impact.service';
import { CreateScReportImpactDto } from './dto/create-sc-report-impact.dto';

@Controller('screports')
@BearerAuth()
export class ScReportController {
  constructor(
    private readonly scReportService: ScReportService,
    private readonly scReportImpactService: ScReportImpactService,
  ) {}

  @Get('/')
  async findAll() {
    return await this.scReportService.findAll();
  }

  @Post('/')
  async create(@Body() body: CreateScReportDto, @User() user) {
    return await this.scReportService.create(body, user);
  }

  @Post('/impacts')
  async createImpact(@Body() body: CreateScReportImpactDto) {
    return await this.scReportImpactService.create(body);
  }

  @Put('/impacts/:impactId')
  async updateImpact(
    @Param('impactId') impactId: number,
    @Body() body: Omit<CreateScReportImpactDto, 'substandardConditionReportId'>,
  ) {
    return await this.scReportImpactService.update(Number(impactId), body);
  }

  @Delete('/impacts/:impactId')
  async deleteImpact(@Param('impactId') impactId: number) {
    return await this.scReportImpactService.delete(Number(impactId));
  }
}
