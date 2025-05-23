import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryInterface } from '../repositories/user-repository.interface';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { UpdateteUserDto } from '../../application/dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepositoryInterface) {}

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(userName: string): Promise<Partial<User>> {
    return this.validate(await this.repository.findOne(userName));
  }

  async create(data: CreateUserDto): Promise<Partial<User>> {
    return await this.repository.create(data);
  }

  async update(
    userName: string,
    data: UpdateteUserDto,
  ): Promise<Partial<User>> {
    this.validate(await this.repository.findOne(userName));

    return await this.repository.update(userName, data);
  }

  async delete(userName: string): Promise<Partial<User>> {
    this.validate(await this.repository.findOne(userName));

    return await this.repository.delete(userName);
  }

  validate(user) {
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }
}
