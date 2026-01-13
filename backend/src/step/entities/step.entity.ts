import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export type StepStatus =
  | 'NOT_STARTED' // non commencé
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'BLOCKED'
  | 'ARCHIVED'
  | 'DELETED'
  | 'UNDER_REVIEW' // en cours de révision
  | 'WAITING_FOR_FEEDBACK'; // en attente de retour
@ObjectType()
@Entity()
export class Step {
  @Field(() => ID, { description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'Step Name' })
  @Column({ length: 100, default: 'First Step' })
  name: string;

  @Field(() => String, { description: 'Step Description' })
  @Column({ nullable: true })
  description: string;

  @Field(() => String, { description: 'Step Status' })
  @Column({ default: 'NOT_STARTED' })
  status: StepStatus;

  @Field(() => GraphQLISODateTime, { description: 'Step End Date' })
  @Column({ nullable: true })
  endDate: Date;

  @Field(() => GraphQLISODateTime, { description: 'Step Creation Date' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { description: 'Step Update Date' })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Field(() => [Project], { description: 'Projects associated with this Step' })
  @ManyToMany(() => Project, (project) => project.step)
  projects: Project[];
}
