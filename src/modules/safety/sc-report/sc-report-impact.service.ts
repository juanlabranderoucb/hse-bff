import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

import { CreateScReportImpactDto } from './dto/create-sc-report-impact.dto';

@Injectable()
export class ScReportImpactService {
  constructor(private readonly db: DatabaseService) {}

  async create(data: CreateScReportImpactDto) {
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
    impactId: number,
    data: Omit<CreateScReportImpactDto, 'substandardConditionReportId'>,
  ) {
    this.validate(
      await this.db.substandardConditionReportImpact.findUnique({
        where: { id: impactId, status: 1 },
        select: { id: true },
      }),
    );

    return await this.db.substandardConditionReportImpact.update({
      where: { id: impactId, status: 1 },
      data: {
        description: data.description,
      },
      select: { id: true },
    });
  }

  async delete(impactId: number) {
    this.validate(
      await this.db.substandardConditionReportImpact.findUnique({
        where: { id: impactId, status: 1 },
        select: { id: true },
      }),
    );

    return await this.db.substandardConditionReportImpact.update({
      where: { id: impactId, status: 1 },
      data: {
        status: 0,
      },
      select: { id: true },
    });
  }

  validate(impact) {
    if (!impact)
      throw new NotFoundException('Consecuencia del reporte no encontrado');
    return impact;
  }
}
