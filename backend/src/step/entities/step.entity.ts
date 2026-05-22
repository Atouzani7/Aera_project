import {
  ObjectType,
  Field,
  ID,
  GraphQLISODateTime,
  Int,
} from '@nestjs/graphql';
import { ProjectEntity } from 'src/project/entities/project.entity';

import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export type StepStatus =
  | 'NOT_STARTED' // non commencé
  | 'IN_PROGRESS'
  | 'PLANNED'
  | 'TERMINED';
@ObjectType()
@Entity('steps')
export class StepEntity {
  @Field(() => ID, { description: 'ID' })
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Field(() => String, { description: 'Step Name' })
  @Column({ length: 100, default: 'First Step' })
  name?: string;

  @Field(() => String, { description: 'Step Description' })
  @Column({ nullable: true })
  description?: string;

  @Field(() => String, { description: 'Step Status' })
  @Column({ default: 'NOT_STARTED' })
  status?: StepStatus;

  @Field(() => GraphQLISODateTime, { description: 'Step End Date' })
  @Column({ nullable: true })
  endDate?: Date;

  @Field(() => GraphQLISODateTime, { description: 'Step Creation Date' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { description: 'Step Update Date' })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;

  @Field(() => [ProjectEntity], {
    description: 'Projects associated with this Step',
  })
  @ManyToMany(() => ProjectEntity, (project) => project.steps)
  projects?: ProjectEntity[];

  @Column({ type: 'int', default: 1 })
  @Field(() => Int)
  sequence_number?: number;
}
