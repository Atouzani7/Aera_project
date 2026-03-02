import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StepService } from './step.service';
import { StepEntity } from './entities/step.entity';
import { CreateStepInput } from './dto/create-step.input';
import { UpdateStepInput } from './dto/update-step.input';
import { CurrentUser, GqlAuthGuard } from 'src/auth/gqlAuthGuard';
import { UserEntity } from 'src/user/entities/user.entity';
import { UseGuards } from '@nestjs/common';

@Resolver(() => StepEntity)
export class StepResolver {
  constructor(private readonly stepService: StepService) {} // ✅ plus de UserEntity ici

  @Mutation(() => StepEntity)
  @UseGuards(GqlAuthGuard)
  async createStep(
    @Args('createStepInput') createStepInput: CreateStepInput,
    @CurrentUser() user: UserEntity,
    @Args('projectId') projectId: string,
  ) {
    return this.stepService.createStep(createStepInput, user.id, projectId);
  }

  @Query(() => [StepEntity], { name: 'steps' })
  findAll() {
    return this.stepService.findAll();
  }

  @Query(() => [StepEntity], { name: 'stepsByProject' })
  async findByProject(@Args('projectId') projectId: string) {
    return this.stepService.findStepByProject(projectId);
  }
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.stepService.findOne(id);
  }

  @Mutation(() => StepEntity)
  updateStep(@Args('updateStepInput') updateStepInput: UpdateStepInput) {
    return this.stepService.update(updateStepInput.id, updateStepInput);
  }

  @Mutation(() => StepEntity)
  removeStep(@Args('id', { type: () => Int }) id: number) {
    return this.stepService.remove(id);
  }
}
