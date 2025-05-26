import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SubstandardConditionImpactRepositoryInterface } from '../../domain/repositories/substandard-condition-impact-repository.interface';
import { CreateSubstandardConditionImpactDto } from '../dtos/create-substandard-condition-impact.dto';
import { SubstandardConditionImpact } from '../../domain/agregates/substandard-condition-impact.aggregate';

export class UpdateSubstandardConditionImpactCommand {
  constructor(
    public readonly id: number,
    public readonly data: Omit<
      CreateSubstandardConditionImpactDto,
      'substandardConditionReportId'
    >
  ) {}
}

@CommandHandler(UpdateSubstandardConditionImpactCommand)
export class UpdateSubstandardConditionImpactHandler implements ICommandHandler<UpdateSubstandardConditionImpactCommand> {
  constructor(
    private readonly repository: SubstandardConditionImpactRepositoryInterface,
  ) {}

  async execute({ id, data }: UpdateSubstandardConditionImpactCommand) {
    const impact = new SubstandardConditionImpact(await this.repository.findOne(id));
    impact.validate();
    return await this.repository.update(id, data);
  }
}
