import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let module: TestingModule;
  let appController: AppController;

  const mockAppDescription = {
    name: 'appName',
    version: 'appVersion',
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getDescription: jest.fn().mockReturnValue(mockAppDescription),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('root', () => {
    it('should return app name and version', () => {
      expect(appController.getDescription()).toEqual(mockAppDescription);
    });
  });
});
