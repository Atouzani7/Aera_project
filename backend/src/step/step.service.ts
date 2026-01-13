import { Injectable } from '@nestjs/common';
import { CreateStepInput } from './dto/create-step.input';
import { UpdateStepInput } from './dto/update-step.input';

@Injectable()
export class StepService {
  create(createStepInput: CreateStepInput) {
    return 'This action adds a new step';
  }

  findAll() {
    return `This action returns all step`;
  }

  findOne(id: number) {
    return `This action returns a #${id} step`;
  }

  update(id: number, updateStepInput: UpdateStepInput) {
    return `This action updates a #${id} step`;
  }

  remove(id: number) {
    return `This action removes a #${id} step`;
  }
}
