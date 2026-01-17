import {
  ObjectType,
  Field,
  Int,
  ID,
  GraphQLISODateTime,
} from '@nestjs/graphql';
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

//     1. Création
// → tout ce qui est production, conception, création de valeur
//     2.    Communication
// → contenu, messages, échanges, visibilité
//     3.    Digital
// → web, outils en ligne, automatisation, tech au sens large
//     4.    Business
// → stratégie, offres, ventes, organisation
//     5.    Contenu
// → rédaction, médias, documents, livrables
//     6.    Organisation
// → gestion, structuration, planification, suivi
//     7.    Accompagnement
// → coaching, conseil, support, prestation humaine
//     8.    Autre
// → liberté totale sans friction
export type ProjectTag =
  | 'Création'
  | 'Communication'
  | 'Digital'
  | 'Business'
  | 'Evénementiel'
  | 'Organisation'
  | 'Accompagnement'
  | 'Autre';

@ObjectType()
@Entity('project')
export class ProjectEntity {
  @Field(() => ID, { description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'Project Name' })
  @Column({ length: 100 /*unique: true */ })
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

  @Field(() => GraphQLEmailAddress, { description: 'Email client' })
  @Column({ nullable: true })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  contact_email: string;

  @Field(() => String, { description: 'name client' })
  @Column({ nullable: false })
  contact_name: string;

  @Field(() => String, { description: 'phone client' })
  @Column({ nullable: true })
  contact_phone: string;

  @Field(() => String, { description: 'tag project' })
  @Column({ nullable: true })
  tag: ProjectTag;

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
    onDelete: 'CASCADE', // Si on supprime le workspace, on supprime ses projets
  })
  workspace: WorkspaceEntity;
}
