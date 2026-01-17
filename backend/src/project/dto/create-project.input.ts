import { InputType, Int, Field } from '@nestjs/graphql';
import { WorkspaceEntity } from 'src/workspace/entities/workspace.entity';

@InputType()
export class CreateProjectInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String)
  contact_name: string;
}
