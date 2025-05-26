import { SubstandardConditionImpactEntity } from "../entities/substandard-condition-impact.entity";

export class SubstandardCondition {
  constructor(
    private readonly id: number,
    private description: string,
    private location: string,
    private date: Date,
    private impacts: SubstandardConditionImpactEntity[],
  ) {}
}
