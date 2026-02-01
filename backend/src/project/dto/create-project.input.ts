import { InputType, Int, Field } from '@nestjs/graphql';
import { WorkspaceEntity } from 'src/workspace/entities/workspace.entity';
import { ProjectStatus, ProjectTag } from '../entities/project.entity';
// import { ProjectStatus } from './entities/project.entity';
import { registerEnumType } from '@nestjs/graphql';

// project-tag.enum.ts
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

registerEnumType(ProjectTagEnum, {
  name: 'ProjectTagEnum',
});

@InputType()
export class CreateProjectInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String)
  contact_name: string;

  // @Field(() => String)
  // name: string;

  // @Field(() => String, { nullable: true })
  // description?: string;

  // @Field(() => String)
  // contact_name: string;

  @Field(() => String)
  contact_email?: string;

  @Field(() => String)
  contact_phone?: string;

  @Field(() => ProjectTagEnum)
  tag?: ProjectTagEnum;

  //   @Field(() => Enumerator, { nullable: true })
  //   status?: ProjectStatus;

  //   @Field(() => String, { nullable: true })
  //   step?: string;

  //   @Field(() => String, { nullable: true })
  //   endDate?: string;
}
