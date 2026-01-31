import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WorkspaceService } from './workspace.service';
import { WorkspaceEntity } from './entities/workspace.entity';
import { CreateWorkspaceInput } from './dto/create-workspace.input';
import { UpdateWorkspaceInput } from './dto/update-workspace.input';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from 'src/auth/gqlAuthGuard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => WorkspaceEntity)
export class WorkspaceResolver {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => WorkspaceEntity, { name: 'createWorkspace' })
  createWorkspace(
    @Args('createWorkspaceInput') createWorkspaceInput: CreateWorkspaceInput,
  ) {
    return this.workspaceService.create(createWorkspaceInput);
  }

  @Query(() => [WorkspaceEntity], { name: 'workspace' })
  findAll() {
    return this.workspaceService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => WorkspaceEntity, { name: 'workspaceByID' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.workspaceService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [WorkspaceEntity], { name: 'userWorkspaces' })
  findUserWorkspaces(@Args('userId') userId: string) {
    return this.workspaceService.findUserWorkspaces(userId);
  }

  @Mutation(() => WorkspaceEntity)
  addUserToWorkspace(
    @Args('workspaceId', { type: () => Int }) workspaceId: string,
    @Args('userId', { type: () => Int }) userId: string,
  ) {
    return this.workspaceService.addUserToWorkspace(workspaceId, userId);
  }

  @Mutation(() => WorkspaceEntity)
  updateWorkspace(
    @Args('updateWorkspaceInput') updateWorkspaceInput: UpdateWorkspaceInput,
  ) {
    return this.workspaceService.update(
      updateWorkspaceInput.id,
      updateWorkspaceInput,
    );
  }

  @Mutation(() => WorkspaceEntity)
  removeWorkspace(@Args('id', { type: () => Int }) id: number) {
    return this.workspaceService.remove(id);
  }
}
