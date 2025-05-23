import { EmailValueObject } from '../vos/email.vo';

export class User {
  constructor(
    public readonly id: number,
    public readonly userName: string,
    private displayName: string,
    private email: EmailValueObject,
  ) {}
}
