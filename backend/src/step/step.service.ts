import { Injectable } from '@nestjs/common';
import { CreateStepInput } from './dto/create-step.input';
import { UpdateStepInput } from './dto/update-step.input';
import { Step } from './entities/step.entity';
import { Project } from 'src/project/entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StepService {
  constructor(
    @InjectRepository(Step)
    private readonly stepRepository: Repository<Step>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  create(createStepInput: CreateStepInput): Promise<Step> {
    const step = this.stepRepository.create({
      ...createStepInput,
    });

    return this.stepRepository.save(step);
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
