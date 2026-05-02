import { Field, ObjectType } from '@nestjs/graphql';
import { ProjectEntity } from 'src/project/entities/project.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('clients')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field(() => String, { description: 'Nom du client' })
  name: string;

  @Column()
  @Field(() => String, { description: 'Email du client' })
  email: string;

  @Column()
  @Field(() => String, { description: 'Téléphone du client' })
  phone: string;

  @Column()
  @Field(() => String, { description: 'Adresse du client' })
  address: string;

  @Column()
  @Field(() => String, { description: 'Ville du client' })
  city: string;

  @Column()
  @Field(() => String, { description: 'Pays du client' })
  country: string;

  @Column()
  @Field(() => String, { description: 'Code postal du client' })
  postalCode: string;

  @Column()
  @Field(() => Date, { description: 'Date de création du client' })
  createdAt: Date;

  @Column()
  @Field(() => Date, { description: 'Date de mise à jour du client' })
  updatedAt: Date;

  @OneToMany(() => ProjectEntity, (project) => project.client)
  projects: ProjectEntity[];
}
