import { SubstandardConditionImpact } from '../entities/substandard-condition-impact.entity';
import { CreateSubstandardConditionImpactDto } from '../../application/dtos/create-substandard-condition-impact.dto';

export abstract class SubstandardConditionImpactRepositoryInterface {
  abstract findOne(
    id: number,
  ): Promise<Partial<SubstandardConditionImpact | null>>;

  abstract create(
    data: CreateSubstandardConditionImpactDto,
  ): Promise<Partial<SubstandardConditionImpact>>;

  abstract update(
    id: number,
    data: Omit<
      CreateSubstandardConditionImpactDto,
      'substandardConditionReportId'
    >,
  ): Promise<Partial<SubstandardConditionImpact>>;

  abstract delete(id: number): Promise<Partial<SubstandardConditionImpact>>;
}
