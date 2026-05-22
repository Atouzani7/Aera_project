import { InputType, Int, Field } from '@nestjs/graphql';
import { StepStatus } from '../entities/step.entity';

@InputType()
export class CreateStepInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  status?: StepStatus;

  @Field(() => Date, { nullable: true })
  endDate?: Date;

  @Field(() => Int, { nullable: true })
  sequence_number?: number;
}

export class UpdateStepDto {
  constructor(
    name: string,
    description: string,
    status: StepStatus,
    sequence_number: number,
    updatedAt: Date,
  ) {
    this.name = name;
    this.description = description;
    this.status = status;
    this.updatedAt = updatedAt;
    this.sequence_number = sequence_number;
  }
  name: string;
  description: string;
  status: StepStatus;
  endDate?: Date;
  updatedAt: Date;
  sequence_number: number;
}
