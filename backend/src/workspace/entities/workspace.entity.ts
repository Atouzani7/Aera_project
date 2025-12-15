import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { GraphQLISO8601Duration } from 'graphql-scalars';
import { File } from 'src/file/entities/file.entity';
import { Project } from 'src/project/entities/project.entity';
import { Status, User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Workspace {
  @Field(() => ID, { description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [Project], {
    description: 'workspaces associated with this project',
  })
  @ManyToMany(() => Project, (project) => project.step)
  projects: Project[];

  @Field(() => [User], { description: 'Users in this Workspace' })
  @OneToMany(() => User, (user) => user.workspaces)
  users: User[];

  @Field(() => File, { description: 'Workspace files' })
  @OneToMany(() => File, (file) => file.workspaces)
  files_id: string;

  @Field(() => String, { description: 'Workspace Name' })
  @Column({ length: 100 })
  name: string;

  @Field(() => String, { description: 'Workspace Description' })
  @Column({ nullable: true })
  description: string;

  @Field(() => GraphQLISO8601Duration, { description: 'Workspace Duration' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(() => GraphQLISO8601Duration, { description: 'Workspace Duration' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Field(() => String, { description: 'Step Status' })
  @Column({ default: 'ACTIVE' })
  status: Status;
}
