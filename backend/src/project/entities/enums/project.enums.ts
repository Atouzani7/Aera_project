import { registerEnumType } from '@nestjs/graphql';

export enum ProjectStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  TERMINED = 'TERMINED',
  PENDING = 'PENDING',
  NOT_STARTED = 'NOT_STARTED',
  CANCELLED = 'CANCELLED',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum ProjectTagEnum {
  CREATION = 'Création',
  COMMUNICATION = 'Communication',
  DIGITAL = 'Digital',
  BUSINESS = 'Business',
  EVENEMENTIEL = 'Evénementiel',
  ORGANISATION = 'Organisation',
  ACCOMPAGNEMENT = 'Accompagnement',
  AUTRE = 'Autre',
}

registerEnumType(ProjectStatus, { name: 'ProjectStatus' });
registerEnumType(ProjectTagEnum, { name: 'ProjectTagEnum' });
