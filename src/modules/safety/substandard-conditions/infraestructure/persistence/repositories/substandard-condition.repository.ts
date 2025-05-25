import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/database.service';
import { SubstandardConditionRepositoryInterface } from '../../../domain/repositories/substandard-condition-repository.interface';
import { SubstandardCondition } from '../../../domain/entities/substandard-condition.entity';
import { User } from 'src/modules/users/domain/entities/user.entity';
import { CreateSubstandardConditionDto } from '../../../application/dtos/create-substandard-condition.dto';

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
export class SubstandardConditionRepository
  implements SubstandardConditionRepositoryInterface
{
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<Array<Partial<SubstandardCondition>>> {
    const reports = await this.db.substandardConditionReport.findMany({
      where: { status: 1 },
      select: {
        id: true,
        description: true,
        location: true,
        date: true,
        user: {
          select: {
            userName: true,
            displayName: true,
          },
        },
        impacts: {
          where: { status: 1 },
          select: {
            id: true,
            description: true,
          },
        },
        suggestedFixes: {
          where: { status: 1 },
          select: {
            id: true,
            description: true,
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

  async findOne(id: number): Promise<Partial<SubstandardCondition | null>> {
    return await this.db.substandardConditionReport.findUnique({
      where: { id, status: 1 },
      select: {
        id: true,
        description: true,
        location: true,
        date: true,
        user: {
          select: {
            userName: true,
            displayName: true,
          },
        },
        impacts: {
          where: { status: 1 },
          select: {
            id: true,
            description: true,
          },
        },
        suggestedFixes: {
          where: { status: 1 },
          select: {
            id: true,
            description: true,
          },
        },
        _count: {
          select: {
            likes: true,
            replies: true,
          },
        },
      },
    });
  }

  async create(
    data: CreateSubstandardConditionDto,
    user: User,
  ): Promise<Partial<SubstandardCondition>> {
    return await this.db.substandardConditionReport.create({
      data: {
        userId: user.id,
        description: data.description,
        location: data.location,
      },
      select: {
        id: true,
      },
    });
  }
}
