import { User } from 'src/modules/users/domain/entities/user.entity';
import { CreateSubstandardConditionDto } from '../../application/dtos/create-substandard-condition.dto';
import { SubstandardCondition } from '../entities/substandard-condition.entity';

export abstract class SubstandardConditionRepositoryInterface {
  abstract findAll(): Promise<Array<Partial<SubstandardCondition>>>;

  abstract findOne(id: number): Promise<Partial<SubstandardCondition | null>>;

  abstract create(
    data: CreateSubstandardConditionDto,
    user: User,
  ): Promise<Partial<SubstandardCondition>>;
}
