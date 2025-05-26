import { IEvent } from '@nestjs/cqrs';
import { SubstandardCondition } from '../../domain/agregates/substandard-condition.aggregate';

export class SubstandardConditionCreatedEvent implements IEvent {
  constructor(public readonly substandardCondition: SubstandardCondition) {}
}