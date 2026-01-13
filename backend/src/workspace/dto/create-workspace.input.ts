import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateWorkspaceInput {
  @Field(() => String, { description: 'Workspace Name' })
  name: string;

  @Field(() => String, { description: 'Workspace Description', nullable: true })
  description?: string;

  @Field(() => String, { description: 'Workspace Avatar', nullable: true })
  avatar?: string;

  @Field(() => String, { description: 'Workspace Tags', nullable: true })
  tags?: string;
}
