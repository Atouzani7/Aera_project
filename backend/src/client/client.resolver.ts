import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ClientService } from './client.service';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { ClientEntity } from './entities/client.entity';
import { ProjectEntity } from 'src/project/entities/project.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gqlAuthGuard';

@Resolver(() => ClientEntity)
export class ClientResolver {
  constructor(private readonly clientService: ClientService) {}

  @Mutation(() => ClientEntity, { name: 'createClient' })
  create(@Args('createClientInput') createClientInput: CreateClientInput) {
    return this.clientService.create(createClientInput);
  }

  @UseGuards(GqlAuthGuard)
  // @Roles('ADMIN')
  @Query(() => [ClientEntity], { name: 'FindAllClients' })
  findAll() {
    return this.clientService.findAll();
  }

  @Query(() => [ClientEntity], { name: 'findMyClients' })
  @UseGuards(GqlAuthGuard)
  async findMyClients(@Context() context): Promise<ClientEntity[]> {
    const user = context.req.user;
    console.log('user', user.name);

    return this.clientService.findAllByUser(user.id);
  }

  @Query(() => ClientEntity, { name: 'FindOneClient' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.clientService.findOne(id);
  }

  @Query(() => [ProjectEntity], { name: 'getCLientProjects' })
  async findProjects(@Args('id', { type: () => String }) id: string) {
    const client = await this.clientService.findOne(id);

    if (!client) {
      throw new Error('Client not found');
    }
    console.log('client.projects backend resolver', client.projects);
    return client;
  }

  @Mutation(() => ClientEntity, { name: 'updateClient' })
  update(@Args('updateClientInput') updateClientInput: UpdateClientInput) {
    return this.clientService.update(updateClientInput.id, updateClientInput);
  }

  @Mutation(() => ClientEntity, { name: 'removeClient' })
  remove(@Args('id') id: number) {
    return this.clientService.remove(id);
  }
}
