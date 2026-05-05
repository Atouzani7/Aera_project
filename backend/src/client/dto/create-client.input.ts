import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateClientInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  lastname: string;

  @Field(() => String)
  email?: string;

  @Field(() => String)
  phone?: string;

  @Field(() => String)
  address?: string;

  @Field(() => String)
  city?: string;

  @Field(() => String)
  country?: string;

  @Field(() => String)
  postalCode?: string;
}
