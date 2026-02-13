import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { ProjectEntity } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from 'src/auth/gqlAuthGuard';
import { UserEntity } from 'src/user/entities/user.entity';
// import { CreateProjectInput } from './dto/create-project.input';
// import { UpdateProjectInput } from './dto/update-project.input';

@Resolver(() => ProjectEntity)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ProjectEntity)
  createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
    @CurrentUser() user: UserEntity,
  ) {
    const userId = user.id;
    const workspaceId = user.workspaceId;
    if (!workspaceId) {
      throw new BadRequestException(
        'Aucun workspace associé à cet utilisateur',
      );
    }
    return this.projectService.createProject(
      createProjectInput,
      userId,
      workspaceId,
    );
  }

  // @Query(() => [Project], { name: 'project' })
  // findAll() {
  //   return this.projectService.findAll();
  // }

  // @Query(() => Project, { name: 'project' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.projectService.findOne(id);
  // }

  // @Mutation(() => Project)
  // updateProject(@Args('updateProjectInput') updateProjectInput: UpdateProjectInput) {
  //   return this.projectService.update(updateProjectInput.id, updateProjectInput);
  // }

  // @Mutation(() => Project)
  // removeProject(@Args('id', { type: () => Int }) id: number) {
  //   return this.projectService.remove(id);
  // }
}
