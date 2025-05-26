import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SubstandardConditionImpactRepositoryInterface } from '../../domain/repositories/substandard-condition-impact-repository.interface';
import { CreateSubstandardConditionImpactDto } from '../dtos/create-substandard-condition-impact.dto';

export class CreateSubstandardConditionImpactCommand {
  constructor(public readonly data: CreateSubstandardConditionImpactDto) {}
}

@CommandHandler(CreateSubstandardConditionImpactCommand)
export class CreateSubstandardConditionImpactHandler implements ICommandHandler<CreateSubstandardConditionImpactCommand> {
  constructor(
    private readonly repository: SubstandardConditionImpactRepositoryInterface,
  ) {}

  async execute(command: CreateSubstandardConditionImpactCommand) {
    return await this.repository.create(command.data);
  }
}
