import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getDescription() {
    return {
      name: this.configService.get<string>('name'),
      version: this.configService.get<string>('version'),
    };
  }
}
