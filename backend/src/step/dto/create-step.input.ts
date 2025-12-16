import { InputType, Int, Field } from '@nestjs/graphql';
import { Project } from 'src/project/entities/project.entity';

@InputType()
export class CreateStepInput {
  @Field(() => String, { description: 'Step Name', defaultValue: 'First Step' })
  name: string;

  @Field(() => String, { description: 'Step Description', nullable: true })
  description?: string;

  // @Field(() => String, { description: 'Step Status', nullable: true })
  // status?: string;

  // @Field(() => Project, { description: 'Step NotionId', nullable: true })
  // project?: Project.id;
}
