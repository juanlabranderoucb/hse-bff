import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { BearerAuth } from 'src/modules/auth/decorator/bearer-auth.decorator';
import { SubstandardConditionImpactService } from '../../domain/services/substandard-condition-impact.service';
import { CreateSubstandardConditionImpactDto } from '../../application/dtos/create-substandard-condition-impact.dto';

@Controller('substandard-condition/impacts')
@BearerAuth()
export class SubstandardConditionImpactController {
  constructor(private readonly service: SubstandardConditionImpactService) {}

  @Post('/')
  async create(@Body() body: CreateSubstandardConditionImpactDto) {
    return await this.service.create(body);
  }

  @Put('/:impactId')
  async updateImpact(
    @Param('impactId') impactId: number,
    @Body()
    body: Omit<
      CreateSubstandardConditionImpactDto,
      'substandardConditionReportId'
    >,
  ) {
    return await this.service.update(Number(impactId), body);
  }

  @Delete('/:impactId')
  async deleteImpact(@Param('impactId') impactId: number) {
    return await this.service.delete(Number(impactId));
  }
}
