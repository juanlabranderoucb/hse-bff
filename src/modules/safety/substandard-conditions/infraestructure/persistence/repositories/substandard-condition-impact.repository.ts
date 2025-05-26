import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/database.service';
import { SubstandardConditionImpactRepositoryInterface } from '../../../domain/repositories/substandard-condition-impact-repository.interface';
import { CreateSubstandardConditionImpactDto } from '../../../application/dtos/create-substandard-condition-impact.dto';
import { SubstandardConditionImpactEntity } from '../../../domain/entities/substandard-condition-impact.entity';

@Injectable()
export class SubstandardConditionImpactRepository
  implements SubstandardConditionImpactRepositoryInterface
{
  constructor(private readonly db: DatabaseService) {}

  async findOne(
    id: number,
  ): Promise<Partial<SubstandardConditionImpactEntity | null>> {
    return await this.db.substandardConditionReportImpact.findUnique({
      where: { id, status: 1 },
      select: {
        id: true,
        description: true,
      },
    });
  }

  async create(
    data: CreateSubstandardConditionImpactDto,
  ): Promise<Partial<SubstandardConditionImpactEntity>> {
    return await this.db.substandardConditionReportImpact.create({
      data: {
        substandardConditionReportId: Number(data.substandardConditionReportId),
        description: data.description,
      },
      select: {
        id: true,
      },
    });
  }

  async update(
    id: number,
    data: Omit<
      CreateSubstandardConditionImpactDto,
      'substandardConditionReportId'
    >,
  ): Promise<Partial<SubstandardConditionImpactEntity>> {
    return await this.db.substandardConditionReportImpact.update({
      where: { id, status: 1 },
      data: {
        description: data.description,
      },
      select: { id: true },
    });
  }

  async delete(id: number): Promise<Partial<SubstandardConditionImpactEntity>> {
    return await this.db.substandardConditionReportImpact.update({
      where: { id: id, status: 1 },
      data: {
        status: 0,
      },
      select: { id: true },
    });
  }
}
