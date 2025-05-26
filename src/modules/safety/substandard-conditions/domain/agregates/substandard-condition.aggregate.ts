import { NotAcceptableException } from "@nestjs/common";
import { SubstandardConditionImpactEntity } from "../entities/substandard-condition-impact.entity";

export class SubstandardCondition {
  constructor(
    private readonly id: number,
    private description: string,
    private location: string,
    private date: Date,
    private impacts: SubstandardConditionImpactEntity[],
  ) {}

  addImpact(impact: SubstandardConditionImpactEntity) {
    this.impacts.push(impact);
  }

  removeImpact(impact: SubstandardConditionImpactEntity) {
    this.impacts = this.impacts.filter((i) => i.id !== impact.id);
  }

  getId() {
    return this.id;
  }
  getDescription() {
    return this.description;
  }
  getLocation() {
    return this.location;
  }

  setDescription(description: string) {
    this.description = description;
  }
  setLocation(location: string) {
    this.location = location;
  }

  validate() {
    if (this.id == 0)
      throw new NotAcceptableException('Condicion subestandar no encontrado');
  }
}
