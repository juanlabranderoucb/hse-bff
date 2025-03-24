import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { User } from '@prisma/client';

import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateteUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async findOne(userName: string): Promise<Partial<User>> {
    const user = await this.db.user.findUnique({
      where: { userName, status: 1 },
      select: {
        id: true,
        userName: true,
        displayName: true,
        email: true,
      },
    });

    return this.validate(user);
  }

  async findOneWithPassword(userName: string, password: string) {
    const user = this.validate(
      await this.db.user.findUnique({
        where: { userName, status: 1 },
        select: {
          id: true,
          userName: true,
          displayName: true,
          password: true,
        },
      }),
    );

    if (!(await compare(password, user.password)))
      throw new NotAcceptableException('Contraseña incorrecta');

    return user;
  }

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

    this.validate(
      await this.db.user.findUnique({
        where: { userName, status: 1 },
      }),
    );

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
    this.validate(
      await this.db.user.findUnique({
        where: { userName, status: 1 },
      }),
    );

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

  validate(user) {
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }
}
