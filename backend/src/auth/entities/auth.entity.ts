import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Auth {
  @Field()
  access_token: string;

  @Field(() => User)
  user: User;

  @Field()
  message: string;
}
@ObjectType()
export class LogoutResponse {
  @Field()
  message: string;
}
