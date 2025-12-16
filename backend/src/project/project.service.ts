import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { Step } from 'src/step/entities/step.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Step)
    private readonly stepRepository: Repository<Step>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  async create(data: CreateProjectInput): Promise<Project> {
    const newProject: Project = this.projectRepository.create(data);
    const { name, description, contact_name } = data;

    const step = this.stepRepository.create({
      name: 'First Step',
    });

    const defaultStep = this.stepRepository.create(step);
    const savedStep = await this.stepRepository.save(defaultStep);

    newProject.step = [savedStep];

    return await this.projectRepository.save(newProject);
  }

  findAll() {
    return `This action returns all project`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectInput: UpdateProjectInput) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
