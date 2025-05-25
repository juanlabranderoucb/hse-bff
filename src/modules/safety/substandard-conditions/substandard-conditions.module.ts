import { Module } from '@nestjs/common';

import { DatabaseService } from '../../database/database.service';
import { SubstandardConditionController } from './presentation/controllers/substandard-condition.controller';
import { SubstandardConditionService } from './domain/services/substandard-condition.service';
import { SubstandardConditionRepositoryInterface } from './domain/repositories/substandard-condition-repository.interface';
import { SubstandardConditionRepository } from './infraestructure/persistence/repositories/substandard-condition.repository';

@Module({
  controllers: [SubstandardConditionController],
  providers: [
    SubstandardConditionService,
    {
      provide: SubstandardConditionRepositoryInterface,
      useClass: SubstandardConditionRepository,
    },
    DatabaseService,
  ],
  exports: [],
})
export class SubstandardConditionModule {}
