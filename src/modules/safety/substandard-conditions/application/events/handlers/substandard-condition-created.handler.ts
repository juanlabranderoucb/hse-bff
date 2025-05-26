import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SubstandardConditionCreatedEvent } from '../substandard-condition-created.event';

@EventsHandler(SubstandardConditionCreatedEvent)
export class SubstandardConditionCreatedHandler implements IEventHandler<SubstandardConditionCreatedEvent> {
  private readonly logger = new Logger(SubstandardConditionCreatedHandler.name);

  handle(event: SubstandardConditionCreatedEvent) {
    this.logger.log(`Substandard Condition created: ${event.substandardCondition.getId()}`);
  }
}
