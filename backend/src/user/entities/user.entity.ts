import {
  ObjectType,
  Field,
  ID,
  GraphQLISODateTime,
  Int,
} from '@nestjs/graphql';
import {
  Length,
  IsString,
  IsEmail,
  Matches,
  MinLength,
  IsDate,
} from 'class-validator';
import { GraphQLEmailAddress } from 'graphql-scalars';
import { Comment } from 'src/comment/entities/comment.entity';
import { File } from 'src/file/entities/file.entity';
import { Project } from 'src/project/entities/project.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type Role = 'admin' | 'user' | 'guest' | 'customer';
export type Status = 'ACTIVE' | 'ARCHIVED';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID, { description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'lastname' })
  @Column({ length: 50 })
  @IsString({ message: 'Lastname must be a string' })
  @Length(2, 50, { message: 'Lastname must be between 2 and 50 characters' })
  lastname: string;

  @Field(() => String, { description: 'Firstname' })
  @Column({ length: 50 })
  @IsString({ message: 'Firstname must be a string' })
  @Length(2, 50, { message: 'Firstname must be between 2 and 50 characters' })
  firstname: string;

  @Field(() => GraphQLEmailAddress, { description: 'Email' })
  @Column({ unique: true, length: 100 })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @Field(() => String, { description: 'Password' })
  @Column()
  @IsString({ message: 'Password must be a string' })
  @Length(8, 100, { message: 'Password must be between 8 and 100 characters' })
  // @MinLength(8, { message: 'Password must be at least 8 characters long' })
  // @Matches(/(?=.*[A-Z])/, {
  //   message: 'Password must contain at least one uppercase letter',
  // })
  // @Matches(/(?=.*\d)/, {
  //   message: 'Password must contain at least one number',
  // })
  // @Matches(/(?=.*[!@#$%^&*])/, {
  //   message: 'Password must contain at least one special character',
  // })
  password: string;

  @Field(() => Int, { description: 'Phone number' })
  @Column({ nullable: true })
  @IsString({ message: 'Phone number must be a number' })
  phoneNumber: number;

  @Field(() => GraphQLISODateTime, { description: 'Date of brith' })
  @Column({ nullable: true, type: 'timestamp' })
  @IsDate({ message: 'Date of birth must be a valid date' })
  dateOfBirth: Date;

  @Field(() => String, { description: 'Role' })
  @Column({
    type: 'text',
    enum: ['admin', 'user', 'guest', 'customer'],
    default: 'user',
  })
  role: Role;

  @Field({ nullable: true })
  @Column({
    nullable: true,
    default:
      'https://www.santelog.com/sites/santelog.com/www.santelog.com/files/styles/large/public/images/accroche/adobestock_276208008_lama.jpeg?itok=d2steNiv',
  })
  profilePicture?: string;

  @Field({ nullable: true })
  @Column({
    type: 'text',
    enum: ['ACTIVE', 'ARCHIVED'],
    default: 'ACTIVE',
  })
  status: Status;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Field(() => [Project])
  @ManyToMany(() => Project, (project) => project.user)
  project: Project[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @Field(() => [Workspace])
  @ManyToOne(() => Workspace, (workspace) => workspace.users)
  workspaces: Workspace[];

  @Field(() => [File])
  @ManyToOne(() => File, (file) => file.user)
  files: Workspace[];
}
