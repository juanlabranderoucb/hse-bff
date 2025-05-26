import { SubstandardConditionImpactEntity } from "../entities/substandard-condition-impact.entity";
import { CreateSubstandardConditionImpactDto } from '../../application/dtos/create-substandard-condition-impact.dto';

export abstract class SubstandardConditionImpactRepositoryInterface {
  abstract findOne(
    id: number,
  ): Promise<Partial<SubstandardConditionImpactEntity | null>>;

  abstract create(
    data: CreateSubstandardConditionImpactDto,
  ): Promise<Partial<SubstandardConditionImpactEntity>>;

  abstract update(
    id: number,
    data: Omit<
      CreateSubstandardConditionImpactDto,
      'substandardConditionReportId'
    >,
  ): Promise<Partial<SubstandardConditionImpactEntity>>;

  abstract delete(id: number): Promise<Partial<SubstandardConditionImpactEntity>>;
}
