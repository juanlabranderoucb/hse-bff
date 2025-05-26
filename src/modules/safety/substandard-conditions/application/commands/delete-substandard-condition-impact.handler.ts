import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SubstandardConditionImpactRepositoryInterface } from '../../domain/repositories/substandard-condition-impact-repository.interface';
import { SubstandardConditionImpact } from '../../domain/agregates/substandard-condition-impact.aggregate';

export class DeleteSubstandardConditionImpactCommand {
  constructor(
    public readonly id: number,
  ) {}
}

@CommandHandler(DeleteSubstandardConditionImpactCommand)
export class DeleteSubstandardConditionImpactHandler implements ICommandHandler<DeleteSubstandardConditionImpactCommand> {
  constructor(
    private readonly repository: SubstandardConditionImpactRepositoryInterface,
  ) {}

  async execute({ id }: DeleteSubstandardConditionImpactCommand) {
    const impact = new SubstandardConditionImpact(await this.repository.findOne(id));
    impact.validate();
    return await this.repository.delete(id);
  }
}
