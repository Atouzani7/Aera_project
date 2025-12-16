import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
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
}

@InputType()
export class UpdateUserInput {
  @Field({ description: 'Lastname' })
  lastname: string;

  @Field({ description: 'Firstname' })
  firstname: string;

  @Field(() => GraphQLEmailAddress, { description: 'Email' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @Field({ description: 'Password' })
  password: string;

  @Field({ description: 'phone number' })
  phoneNumber: number;

  @Field({ description: 'date of birth' })
  dateOfBirth: Date;

  @Field({ description: 'profile picture' })
  profilePicture?: string;
}
