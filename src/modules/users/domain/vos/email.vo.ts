export class EmailValueObject {
  constructor(public readonly value: string) {
    if (!this.isValidEmail(value)) {
      throw new Error('Email inválido');
    }
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
