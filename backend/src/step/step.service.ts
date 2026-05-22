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
    userId: string,
    projectId: string,
  ): Promise<StepEntity> {
    // 1️⃣ Récupérer l'utilisateur avec le projet spécifique et SES étapes
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['project', 'project.steps'], // 👈 Important: on charge les steps existantes
    });

    if (!user) throw new NotFoundException('User not found');

    const project = user.project.find((p) => p.id === Number(projectId));
    if (!project) throw new ForbiddenException('Access denied');

    // 2️⃣ Calculer la position (le nombre de steps actuelles + 1)
    // Si le projet n'a pas encore de steps, on commence à 1
    const nextOrder = (project.steps?.length || 0) + 1;

    // 3️⃣ Créer la step avec son numéro de séquence
    const step = this.stepRepository.create({
      ...createStepInput,
      status: createStepInput.status || 'NOT_STARTED',
      projects: [project],
      sequence_number: nextOrder, // ✅ Voilà ton "Etape 1", "Etape 2"...
    });

    return this.stepRepository.save(step);
  }

  async findStepByProject(projectId: string): Promise<StepEntity[]> {
    const project = await this.projectRepository.findOne({
      where: { id: Number(projectId) },
      relations: ['steps'],
    });

    if (!project) throw new NotFoundException('Project not found');

    return project.steps || [];
  }

  findAll() {
    return `This action returns all step`;
  }

  findOne(id: number) {
    return `This action returns a #${id} step`;
  }

  async update(id: string, updateStepInput: UpdateStepInput) {
    const step = await this.stepRepository.findOne({
      where: { id: String(id) },
    });
    if (!step) {
      throw new NotFoundException(
        `Step with ID ${updateStepInput.id} not found`,
      );
    }

    Object.assign(step, updateStepInput);

    console.log('step', step);
    return await this.stepRepository.save(step);
  }

  remove(id: number) {
    return `This action removes a #${id} step`;
  }
}
