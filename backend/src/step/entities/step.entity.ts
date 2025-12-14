import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Step {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
