import { NotAcceptableException } from '@nestjs/common';
import { SubstandardConditionImpactEntity } from '../entities/substandard-condition-impact.entity';

export class SubstandardConditionImpact {
  private _id: number;
  private _description: string;

  constructor(substandardConditionImpact?: Partial<SubstandardConditionImpactEntity | null>) {
    if (substandardConditionImpact) {
      this._id = substandardConditionImpact.id ?? 0;
      this._description = substandardConditionImpact.description ?? '';
    } else {
      this._id = 0;
      this._description = '';
    }
  }

  validate() {
    if (this._id == 0)
      throw new NotAcceptableException('Consecuencia del reporte no encontrado');
  }
}
