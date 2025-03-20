import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { AppService } from './app.service';

describe('FuncionarioService', () => {
  let module: TestingModule;
  let appService: AppService;

  const mockResult = { name: '-', version: '-' };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('-'),
          },
        },
      ],
    }).compile();
    appService = module.get<AppService>(AppService);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('root', () => {
    it('should return app name and version', () => {
      expect(appService.getDescription()).toEqual(mockResult);
    });
  });
});
