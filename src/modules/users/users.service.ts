import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';

import { DatabaseService } from '../database/database.service';

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

  validate(user) {
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }
}
