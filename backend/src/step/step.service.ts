import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStepInput } from './dto/create-step.input';
import { UpdateStepInput } from './dto/update-step.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StepEntity } from './entities/step.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ProjectEntity } from 'src/project/entities/project.entity';

@Injectable()
export class StepService {
  constructor(
    @InjectRepository(StepEntity)
    private readonly stepRepository: Repository<StepEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  async createStep(
    createStepInput: CreateStepInput,
    userId: string, // UUID de l'utilisateur connecté
    projectId: string,
  ): Promise<StepEntity> {
    // 1️⃣ Récupérer l'utilisateur et ses projets
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['project'],
    });
    if (!user) throw new NotFoundException('User not found');

    // 2️⃣ Vérifier que le projet appartient à l'utilisateur
    // const project = user.project.find((p) => p.id === projectId);
    const project = user.project.find((p) => p.id === Number(projectId));
    if (!project)
      throw new ForbiddenException(
        'You are not allowed to create a step in this project',
      );

    // 3️⃣ Créer la step avec le projet dans le tableau
    const step = this.stepRepository.create({
      name: createStepInput.name,
      description: createStepInput.description,
      status: createStepInput.status || 'NOT_STARTED',
      endDate: createStepInput.endDate || null,
      projects: [project], // ✅ Must be array because @ManyToMany
    });

    // 4️⃣ Sauvegarder et retourner
    return this.stepRepository.save(step);
  }

  async findStepByProject(projectId: string): Promise<StepEntity[]> {
    const project = await this.projectRepository.findOne({
      where: { id: Number(projectId) },
      relations: ['step'],
    });

    if (!project) throw new NotFoundException('Project not found');

    return project.step || [];
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
