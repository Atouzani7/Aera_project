import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StepService } from './step.service';
import { Step } from './entities/step.entity';
import { CreateStepInput } from './dto/create-step.input';
import { UpdateStepInput } from './dto/update-step.input';

@Resolver(() => Step)
export class StepResolver {
  constructor(private readonly stepService: StepService) {}

  @Mutation(() => Step)
  createStep(@Args('createStepInput') createStepInput: CreateStepInput) {
    return this.stepService.create(createStepInput);
  }

  @Query(() => [Step], { name: 'step' })
  findAll() {
    return this.stepService.findAll();
  }

  @Query(() => Step, { name: 'step' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.stepService.findOne(id);
  }

  @Mutation(() => Step)
  updateStep(@Args('updateStepInput') updateStepInput: UpdateStepInput) {
    return this.stepService.update(updateStepInput.id, updateStepInput);
  }

  @Mutation(() => Step)
  removeStep(@Args('id', { type: () => Int }) id: number) {
    return this.stepService.remove(id);
  }
}
