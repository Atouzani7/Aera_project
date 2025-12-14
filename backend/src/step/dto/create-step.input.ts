import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStepInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
