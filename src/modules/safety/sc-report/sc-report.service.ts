import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../../database/database.service';
import { CreateScReportDto } from './dto/create-sc-report.dto';
import { User } from '@prisma/client';

const elapsed = (startDate: Date): string => {
  const now = new Date();

  const elapsedMilliseconds = now.getTime() - startDate.getTime(); // Diferencia en milisegundos
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000); // Convertir a segundos
  const elapsedMinutes = Math.floor(elapsedSeconds / 60); // Convertir a minutos
  const elapsedHours = Math.floor(elapsedMinutes / 60); // Convertir a horas
  const elapsedDays = Math.floor(elapsedHours / 24); // Convertir a días

  if (elapsedDays > 0) {
    return `hace ${elapsedDays % 60} días`;
  } else if (elapsedHours > 0) {
    return `hace ${elapsedHours % 60} horas`;
  } else if (elapsedMinutes == 1) {
    return `hace 1 minuto`;
  } else if (elapsedMinutes > 1) {
    return `hace ${elapsedMinutes % 60} minutos`;
  } else {
    return 'ahora';
  }
};

@Injectable()
export class ScReportService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    const reports = await this.db.substandardConditionReport.findMany({
      where: { status: 1 },
      select: {
        id: true,
        description: true,
        date: true,
        user: {
          select: {
            userName: true,
            displayName: true,
          },
        },
        _count: {
          select: {
            likes: true,
            replies: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    return reports.map(({ date, _count, ...r }) => ({
      ...r,
      elapsed: elapsed(date),
      ..._count,
    }));
  }

  async create(data: CreateScReportDto, user: User) {
    return await this.db.substandardConditionReport.create({
      data: {
        userId: user.id,
        description: data.description,
      },
      select: {
        id: true,
      },
    });
  }
}
