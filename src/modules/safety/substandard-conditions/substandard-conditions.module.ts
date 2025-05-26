import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseService } from '../../database/database.service';
import { SubstandardConditionController } from './presentation/controllers/substandard-condition.controller';
import { SubstandardConditionImpactController } from './presentation/controllers/substandard-condition-impact.controller';
import { SubstandardConditionService } from './domain/services/substandard-condition.service';
import { SubstandardConditionImpactService } from './domain/services/substandard-condition-impact.service';
import { SubstandardConditionRepositoryInterface } from './domain/repositories/substandard-condition-repository.interface';
import { SubstandardConditionRepository } from './infraestructure/persistence/repositories/substandard-condition.repository';
import { SubstandardConditionImpactRepositoryInterface } from './domain/repositories/substandard-condition-impact-repository.interface';
import { SubstandardConditionImpactRepository } from './infraestructure/persistence/repositories/substandard-condition-impact.repository';
import { CreateSubstandardConditionImpactHandler } from './application/commands/create-substandard-condition-impact.handler';
import { UpdateSubstandardConditionImpactHandler } from './application/commands/update-substandard-condition-impact.handler';
import { DeleteSubstandardConditionImpactHandler } from './application/commands/delete-substandard-condition-impact.handler';
import { EventHandlers } from './application/events/handlers';

@Module({
  imports: [CqrsModule],
  controllers: [SubstandardConditionController, SubstandardConditionImpactController],
  providers: [
    SubstandardConditionService,
    SubstandardConditionImpactService,
    CreateSubstandardConditionImpactHandler,
    UpdateSubstandardConditionImpactHandler,
    DeleteSubstandardConditionImpactHandler,
    ...EventHandlers,
    {
      provide: SubstandardConditionRepositoryInterface,
      useClass: SubstandardConditionRepository,
    },
    {
      provide: SubstandardConditionImpactRepositoryInterface,
      useClass: SubstandardConditionImpactRepository,
    },
    DatabaseService
  ],
  exports: [],
})
export class SubstandardConditionModule {}
