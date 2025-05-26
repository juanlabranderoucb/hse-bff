import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateSubstandardConditionImpactDto } from '../../application/dtos/create-substandard-condition-impact.dto';
import { SubstandardConditionImpactEntity } from '../entities/substandard-condition-impact.entity';
import { CreateSubstandardConditionImpactCommand } from '../../application/commands/create-substandard-condition-impact.handler';
import { UpdateSubstandardConditionImpactCommand } from '../../application/commands/update-substandard-condition-impact.handler';
import { DeleteSubstandardConditionImpactCommand } from '../../application/commands/delete-substandard-condition-impact.handler';

@Injectable()
export class SubstandardConditionImpactService {
  constructor(
    private readonly commandBus: CommandBus
  ) {}

  async create(
    data: CreateSubstandardConditionImpactDto,
  ): Promise<Partial<SubstandardConditionImpactEntity>> {
    return this.commandBus.execute(new CreateSubstandardConditionImpactCommand(data));
  }

  async update(
    id: number,
    data: Omit<
      CreateSubstandardConditionImpactDto,
      'substandardConditionReportId'
    >,
  ): Promise<Partial<SubstandardConditionImpactEntity>> {
    return this.commandBus.execute(new UpdateSubstandardConditionImpactCommand(id, data));
  }

  async delete(id: number): Promise<Partial<SubstandardConditionImpactEntity>> {
    return this.commandBus.execute(new DeleteSubstandardConditionImpactCommand(id));
  }
}
