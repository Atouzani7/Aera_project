import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { File } from 'src/file/entities/file.entity';
import { Project } from 'src/project/entities/project.entity';
import { Status, UserEntity } from 'src/user/entities/user.entity';
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

  @Field(() => [UserEntity], { description: 'Users in this Workspace' })
  @OneToMany(() => UserEntity, (user) => user.workspaces, { cascade: true })
  users: UserEntity[];

  // @OneToMany(() => UserEntity, (user) => user.workspaces)
  // users: UserEntity[];

  @Field(() => File, { description: 'Workspace files' })
  @OneToMany(() => File, (file) => file.workspaces)
  files_id: string;

  @Field(() => String, { description: 'Workspace Avatar' })
  @Column({ default: 'frontend/public/aera_project.logo.png', nullable: true })
  avatar?: String;

  @Field(() => String, { description: 'Workspace Name' })
  @Column({ length: 100 })
  name: string;

  @Field(() => String, { description: 'Workspace Description' })
  @Column({ nullable: true })
  description: string;

  @Field(() => GraphQLISODateTime, { description: 'Workspace Duration' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { description: 'Workspace Duration' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  archiveDateColumn?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  unarchiveDateColumn?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  DeleteDateColumn?: Date;

  @Field(() => String, { description: 'Step Status' })
  @Column({ default: 'ACTIVE' })
  status: Status;
}
