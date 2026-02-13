import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { GraphQLEmailAddress } from 'graphql-scalars';
import { Comment } from 'src/comment/entities/comment.entity';
import { Step } from 'src/step/entities/step.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { WorkspaceEntity } from 'src/workspace/entities/workspace.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { registerEnumType } from '@nestjs/graphql';
import { ProjectStatus, ProjectTagEnum } from './enums/project.enums';

//////////////////////
// ENTITÉ
//////////////////////

@ObjectType()
@Entity('project')
export class ProjectEntity {
  @Field(() => ID, { description: 'ID' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Field(() => String, { description: 'Project Name' })
  @Column({ length: 100 })
  name: string;

  @Field(() => String, { description: 'Project Description', nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => ProjectStatus, { description: 'Project Status' })
  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.PLANNED,
  })
  status: ProjectStatus;

  @Field(() => ProjectTagEnum, { description: 'Project Tag', nullable: true })
  @Column({
    type: 'enum',
    enum: ProjectTagEnum,
    nullable: true,
  })
  tag: ProjectTagEnum;

  @Field(() => GraphQLISODateTime, { description: 'Project Start Date' })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime, {
    description: 'Project End Date',
    nullable: true,
  })
  @Column({ nullable: true })
  deadline: Date;

  @Field(() => GraphQLISODateTime, { description: 'Project Update Date' })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Field(() => GraphQLISODateTime, {
    description: 'Project Archive Date',
    nullable: true,
  })
  @Column({ nullable: true })
  archivedAt: Date;

  @Field(() => String, {
    description: 'Project Google DriveId',
    nullable: true,
  })
  @Column({ nullable: true })
  GDriveId: string;

  @Field(() => String, { description: 'Project NotionId', nullable: true })
  @Column({ nullable: true })
  Notion_id: string;

  @Field(() => String, { description: 'Project img', nullable: true })
  @Column({ nullable: true })
  Brand_identity: string;

  @Field(() => GraphQLEmailAddress, {
    description: 'Email client',
    nullable: true,
  })
  @Column({ nullable: true })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  contact_email: string;

  @Field(() => String, { description: 'Name client' })
  @Column({ nullable: false })
  contact_name: string;

  @Field(() => String, { description: 'Phone client', nullable: true })
  @Column({ nullable: true })
  contact_phone: string;

  @Field(() => [UserEntity])
  @ManyToMany(() => UserEntity, (user) => user.project)
  @JoinTable()
  users: UserEntity[];

  @Field(() => [Step])
  @ManyToMany(() => Step, (step) => step.projects)
  @JoinTable()
  step: Step[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.project)
  comments: Comment[];

  @Field(() => WorkspaceEntity)
  @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.projects, {
    onDelete: 'CASCADE',
  })
  workspace: WorkspaceEntity;
}
