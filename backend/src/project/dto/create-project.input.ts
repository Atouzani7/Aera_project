import { InputType, Int, Field } from '@nestjs/graphql';
import { WorkspaceEntity } from 'src/workspace/entities/workspace.entity';
import { registerEnumType } from '@nestjs/graphql';
import { ProjectStatus, ProjectTagEnum } from '../entities/enums/project.enums';
import { ClientEntity } from 'src/client/entities/client.entity';

@InputType()
export class CreateProjectInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  clientId?: string; // Si le client existe déjà

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  contact_name: ClientEntity['name'];

  @Field(() => String, { nullable: true })
  contact_lastname: ClientEntity['lastname'];

  @Field(() => String, { nullable: true })
  contact_email?: ClientEntity['email'];

  @Field(() => String, { nullable: true })
  contact_phone?: ClientEntity['phone'];

  @Field(() => String, { nullable: true })
  contact_address?: ClientEntity['address'];

  @Field(() => String, { nullable: true })
  contact_city?: ClientEntity['city'];

  @Field(() => String, { nullable: true })
  contact_country?: ClientEntity['country'];

  @Field(() => String, { nullable: true })
  contact_postalCode?: ClientEntity['postalCode'];

  @Field(() => ProjectTagEnum)
  tag?: ProjectTagEnum;

  @Field(() => ProjectStatus, { nullable: true })
  status?: ProjectStatus;

  //   @Field(() => String, { nullable: true })
  //   step?: string;

  @Field(() => Date, { nullable: true })
  deadline?: Date;
}
