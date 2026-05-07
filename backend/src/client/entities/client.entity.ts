import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProjectEntity } from 'src/project/entities/project.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('clients')
export class ClientEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field(() => String, { description: 'Nom du client' })
  name: string;

  @Column()
  @Field(() => String, { description: 'Nom de famille du client' })
  lastname: string;

  @Column({ unique: true })
  @Field(() => String, { description: 'Email du client' })
  email: string;

  @Column()
  @Field(() => String, { description: 'Téléphone du client' })
  phone: string;

  @Column()
  @Field({ description: 'Adresse du client' })
  address: string;

  @Column()
  @Field({ description: 'Ville du client' })
  city: string;

  @Column()
  @Field({ description: 'Pays du client' })
  country: string;

  @Column()
  @Field({ description: 'Code postal du client' })
  postalCode: string;

  @Column()
  @Field(() => Date, { description: 'Date de création du client' })
  createdAt: Date;

  @Column()
  @Field(() => Date, { description: 'Date de mise à jour du client' })
  updatedAt: Date;

  @OneToMany(() => ProjectEntity, (project) => project.client)
  projects: ProjectEntity[];

  // @ManyToOne(() => UserEntity, (user) => user.client)
  // user: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.client)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  userId: string;
}
