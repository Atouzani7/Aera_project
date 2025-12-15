import {
  ObjectType,
  Field,
  Int,
  ID,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { Comment } from 'src/comment/entities/comment.entity';
import { Step } from 'src/step/entities/step.entity';
import { User } from 'src/user/entities/user.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type ProjectStatus =
  | 'PLANNED' // planifié
  | 'IN_PROGRESS'
  | 'COMPLETED' // terminé
  | 'ON_HOLD' // en attente
  | 'CANCELLED' // annulé
  | 'ARCHIVED' // archivé
  | 'DELETED' // supprimé
  | 'APPROVED' // approuvé
  | 'REJECTED'; // rejeté

@ObjectType()
@Entity()
export class Project {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;

  @Field(() => ID, { description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'Project Name' })
  @Column({ length: 100 })
  name: string;

  @Field(() => String, { description: 'Project Description' })
  @Column({ nullable: true })
  description: string;

  @Field(() => String, { description: 'Project Status' })
  @Column({ default: 'PLANNED' })
  status: ProjectStatus;

  @Field(() => GraphQLISODateTime, { description: 'Project Start Date' })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { description: 'Project End Date' })
  @Column({ nullable: true })
  endDate: Date;

  @Field(() => GraphQLISODateTime, { description: 'Project Update Date' })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Field(() => GraphQLISODateTime, { description: 'Project Archive Date' })
  @Column({ nullable: true })
  archivedAt: Date;

  @Field(() => String, { description: 'Project Google DriveId' })
  @Column({ nullable: true })
  GDriveId: string;

  @Field(() => String, { description: 'Project NotionId' })
  @Column({ nullable: true })
  Notion_id: string;

  @Field(() => String, { description: 'Project img' })
  @Column({ nullable: true })
  Brand_identity: string;

  @Field(() => String, { description: 'email client' })
  @Column({ nullable: true })
  contact_email: string;

  @Field(() => String, { description: 'name client' })
  @Column({ nullable: true })
  contact_name: string;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.project)
  @JoinTable()
  user: User[];

  @Field(() => [Step])
  @ManyToMany(() => Step, (step) => step.projects)
  @JoinTable()
  step: Step[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.project)
  comments: Comment[];

  @Field(() => [Workspace])
  @ManyToMany(() => Workspace, (workspace) => workspace.projects)
  workspaces: Workspace[];
}
