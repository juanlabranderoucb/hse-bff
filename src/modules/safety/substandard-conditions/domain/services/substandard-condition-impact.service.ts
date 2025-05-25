import { Injectable, NotFoundException } from '@nestjs/common';
import { SubstandardConditionImpactRepositoryInterface } from '../repositories/substandard-condition-impact-repository.interface';
import { CreateSubstandardConditionImpactDto } from '../../application/dtos/create-substandard-condition-impact.dto';
import { SubstandardConditionImpact } from '../entities/substandard-condition-impact.entity';

@Injectable()
export class SubstandardConditionImpactService {
  constructor(
    private readonly repository: SubstandardConditionImpactRepositoryInterface,
  ) {}

  async create(
    data: CreateSubstandardConditionImpactDto,
  ): Promise<Partial<SubstandardConditionImpact>> {
    return await this.repository.create(data);
  }

  async update(
    id: number,
    data: Omit<
      CreateSubstandardConditionImpactDto,
      'substandardConditionReportId'
    >,
  ): Promise<Partial<SubstandardConditionImpact>> {
    this.validate(await this.repository.findOne(id));

    return await this.repository.update(id, data);
  }

  async delete(id: number): Promise<Partial<SubstandardConditionImpact>> {
    this.validate(await this.repository.findOne(id));

    return await this.repository.delete(id);
  }

  private validate(impact) {
    if (!impact)
      throw new NotFoundException('Consecuencia del reporte no encontrado');
    return impact;
  }
}
