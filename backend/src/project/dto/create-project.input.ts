import { InputType, Int, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { ProjectTag } from '../entities/project.entity';
import { Step } from 'src/step/entities/step.entity';

@InputType()
export class CreateProjectInput {
  @Field(() => String, { description: 'Project Name' })
  name: string;

  @Field(() => String, { description: 'Project Description', nullable: true })
  description?: string;

  @Field(() => GraphQLISODateTime, {
    description: 'Project End Date',
    nullable: true,
  })
  endDate?: Date;

  @Field(() => String, {
    description: 'Project Google DriveId',
    nullable: true,
  })
  GDriveId?: string;

  @Field(() => String, { description: 'Project NotionId', nullable: true })
  Notion_id?: string;

  @Field(() => String, { description: 'Project img', nullable: true })
  Brand_identity?: string;

  @Field(() => String, { description: 'email client', nullable: true })
  contact_email?: string;

  @Field(() => String, { description: 'name client', nullable: true })
  contact_name?: string;

  @Field(() => String, { description: 'phone client', nullable: true })
  contact_phone?: string;

  @Field(() => String, { description: 'tag project', nullable: true })
  tag?: ProjectTag;

  @Field(() => String, { description: 'step project', nullable: true })
  step?: Step[];
}
