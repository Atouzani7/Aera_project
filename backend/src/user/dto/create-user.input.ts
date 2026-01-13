import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { GraphQLEmailAddress } from 'graphql-scalars';

@InputType()
export class CreateUserInput {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  workspaceName?: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field(() => GraphQLEmailAddress, { nullable: true })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  phoneNumber?: number;

  @Field({ nullable: true })
  dateOfBirth?: Date;

  @Field({ nullable: true })
  profilePicture?: string;
}
@InputType()
export class LoginInput {
  @Field(() => GraphQLEmailAddress, { description: 'Email' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @Field({ description: 'Password' })
  password: string;
}
