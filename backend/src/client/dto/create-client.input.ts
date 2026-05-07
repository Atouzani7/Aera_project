import { Field, InputType, Int } from '@nestjs/graphql';
import { UserEntity } from 'src/user/entities/user.entity';

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

  @Field()
  address?: string;

  @Field()
  city?: string;

  @Field()
  country?: string;

  @Field({ nullable: true })
  postalCode?: string;
}
