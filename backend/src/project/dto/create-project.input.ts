import { InputType, Int, Field } from '@nestjs/graphql';
import { WorkspaceEntity } from 'src/workspace/entities/workspace.entity';
import { registerEnumType } from '@nestjs/graphql';
import { ProjectStatus, ProjectTagEnum } from '../entities/enums/project.enums';

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

  @Field(() => ProjectStatus, { nullable: true })
  status?: ProjectStatus;

  //   @Field(() => String, { nullable: true })
  //   step?: string;

  @Field(() => Date, { nullable: true })
  deadline?: Date;
}
