import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { UserEntity } from 'src/user/entities/user.entity';
import { WorkspaceEntity } from 'src/workspace/entities/workspace.entity';

@ObjectType()
export class Auth {
  @Field()
  access_token: string;

  @Field(() => UserEntity)
  user: UserEntity;

  @Field()
  message: string;

  @Field(() => WorkspaceEntity, { nullable: true })
  workspace?: WorkspaceEntity;

  // @Field()
  // workspace: string;

  // @Field()
  // token: string;
}
@ObjectType()
export class LogoutResponse {
  @Field()
  message: string;
}

@ObjectType()
export class RegisterResponse {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field(() => UserEntity)
  user: UserEntity;

  @Field(() => WorkspaceEntity, { nullable: true })
  workspace: WorkspaceEntity;
}

@ObjectType()
export class LoginResponse {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  token: string;
}
