import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { UpdateteUserDto } from '../../application/dtos/update-user.dto';
import { User } from '../entities/user.entity';

export abstract class UserRepositoryInterface {
  abstract findAll(): Promise<Array<Partial<User>>>;

  abstract findOne(userName: string): Promise<Partial<User | null>>;

  abstract create(data: CreateUserDto): Promise<Partial<User>>;

  abstract update(
    userName: string,
    data: UpdateteUserDto,
  ): Promise<Partial<User>>;

  abstract delete(userName: string): Promise<Partial<User>>;
}
