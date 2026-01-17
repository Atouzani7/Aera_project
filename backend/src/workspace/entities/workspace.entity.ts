import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { File } from 'src/file/entities/file.entity';
import { ProjectEntity } from 'src/project/entities/project.entity';
import { Status, UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('workspace')
export class WorkspaceEntity {
  @Field(() => ID, { description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  // @Field(() => [ProjectEntity], {
  //   description: 'workspaces associated with this project',
  // })
  // @ManyToMany(() => ProjectEntity, (project) => project.step)
  // projects: ProjectEntity[];

  // Un workspace a plusieurs projets
  @Field(() => [ProjectEntity])
  @OneToMany(() => ProjectEntity, (project) => project.workspace)
  projects: ProjectEntity[];

  @Field(() => [UserEntity], { description: 'Users in this Workspace' })
  @OneToMany(() => UserEntity, (user) => user.workspace, { cascade: true })
  users: UserEntity[];

  // @OneToMany(() => UserEntity, (user) => user.workspaces)
  // users: UserEntity[];

  @Field(() => File, { description: 'Workspace files' })
  @OneToMany(() => File, (file) => file.workspaces)
  files_id: File[];

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
