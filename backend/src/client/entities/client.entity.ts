import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
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

  @Column({ nullable: false })
  @Field(() => String, { description: 'Nom du client' })
  @IsString({ message: 'Firstname must be a string' })
  name: string;

  @Column()
  @Field(() => String, { description: 'Nom de famille du client' })
  @IsString({ message: 'Firstname must be a string' })
  lastname: string;

  @Column({ unique: true })
  @Field(() => String, { description: 'Email du client' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @Column()
  @Field(() => String, { description: 'Téléphone du client' })
  phone: string;

  @Column()
  @Field({ description: 'Adresse du client' })
  address: string;

  @Column()
  @Field({ description: 'Ville du client' })
  @IsString({ message: 'Firstname must be a string' })
  city: string;

  @Column()
  @Field({ description: 'Pays du client' })
  @IsString({ message: 'Firstname must be a string' })
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
