import { Injectable, NotFoundException } from '@nestjs/common';
import { SubstandardConditionRepositoryInterface } from '../repositories/substandard-condition-repository.interface';
import { SubstandardCondition } from '../entities/substandard-condition.entity';
import { CreateSubstandardConditionDto } from '../../application/dtos/create-substandard-condition.dto';
import { User } from 'src/modules/users/domain/entities/user.entity';

@Injectable()
export class SubstandardConditionService {
  constructor(
    private readonly repository: SubstandardConditionRepositoryInterface,
  ) {}

  async findAll(): Promise<Array<Partial<SubstandardCondition>>> {
    return await this.repository.findAll();
  }

  async findOne(id: number): Promise<Partial<SubstandardCondition>> {
    return this.validate(await this.repository.findOne(id));
  }

  async create(
    data: CreateSubstandardConditionDto,
    user: User,
  ): Promise<Partial<SubstandardCondition>> {
    return await this.repository.create(data, user);
  }

  private validate(substandardCondition: Partial<SubstandardCondition | null>) {
    if (!substandardCondition)
      throw new NotFoundException('Usuario no encontrado');
    return substandardCondition;
  }
}
