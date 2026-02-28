import { InputType, Int, Field } from '@nestjs/graphql';
import { StepStatus } from '../entities/step.entity';

@InputType()
export class CreateStepInput {
  @Field(() => String, { defaultValue: 'First Step' })
  name: string;

  @Field(() => String)
  description?: string;

  @Field(() => String)
  status?: StepStatus;

  @Field(() => Date, { nullable: true })
  endDate: Date;
}

export class UpdateStepDto {
  constructor(
    name: string,
    description: string,
    status: StepStatus,
    updatedAt: Date,
  ) {
    this.name = name;
    this.description = description;
    this.status = status;
    this.updatedAt = updatedAt;
  }
  name: string;
  description: string;
  status: StepStatus;
  endDate: Date;
  updatedAt: Date;
}
