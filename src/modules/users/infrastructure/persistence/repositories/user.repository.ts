import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { DatabaseService } from 'src/modules/database/database.service';
import { CreateUserDto } from 'src/modules/users/application/dtos/create-user.dto';
import { UpdateteUserDto } from 'src/modules/users/application/dtos/update-user.dto';
import { User } from 'src/modules/users/domain/entities/user.entity';
import { UserRepositoryInterface } from 'src/modules/users/domain/repositories/user-repository.interface';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<Array<Partial<User>>> {
    return await this.db.user.findMany({
      where: { status: 1 },
      select: {
        id: true,
        userName: true,
        displayName: true,
        email: true,
      },
    });
  }

  async findOne(userName: string): Promise<Partial<User | null>> {
    return await this.db.user.findUnique({
      where: { userName, status: 1 },
      select: {
        id: true,
        userName: true,
        displayName: true,
        email: true,
      },
    });
  }

  async create(data: CreateUserDto): Promise<Partial<User>> {
    const { password } = data;
    return await this.db.user.create({
      data: {
        userName: data.userName,
        displayName: data.displayName,
        email: data.email,
        password: await hash(password, 12),
      },
      select: {
        id: true,
        userName: true,
        displayName: true,
        email: true,
      },
    });
  }

  async update(
    userName: string,
    data: UpdateteUserDto,
  ): Promise<Partial<User>> {
    const { password } = data;

    return await this.db.user.update({
      where: { userName },
      data: {
        displayName: data.displayName,
        email: data.email,
        password: password ? await hash(password, 12) : undefined,
      },
      select: {
        id: true,
        userName: true,
        displayName: true,
        email: true,
      },
    });
  }

  async delete(userName: string): Promise<Partial<User>> {
    return await this.db.user.update({
      where: { userName },
      data: {
        status: 0,
      },
      select: {
        id: true,
        userName: true,
        displayName: true,
        email: true,
      },
    });
  }
}
