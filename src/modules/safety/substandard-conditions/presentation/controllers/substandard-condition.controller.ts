import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BearerAuth } from 'src/modules/auth/decorator/bearer-auth.decorator';
import { SubstandardConditionService } from '../../domain/services/substandard-condition.service';
import { CreateSubstandardConditionDto } from '../../application/dtos/create-substandard-condition.dto';
import { User } from 'src/modules/auth/decorator/user.decorator';

@Controller('substandard-conditions')
@BearerAuth()
export class SubstandardConditionController {
  constructor(
    private readonly substandardConditionService: SubstandardConditionService,
  ) {}

  @Get('/')
  async findAll() {
    return await this.substandardConditionService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return await this.substandardConditionService.findOne(Number(id));
  }

  @Post('/')
  async create(@Body() body: CreateSubstandardConditionDto, @User() user) {
    return await this.substandardConditionService.create(body, user);
  }
}
