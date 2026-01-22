import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { UserService } from 'src/user/user.service';
import { ProjectEntity } from './entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(forwardRef(() => WorkspaceService))
    // Quand A dépend de B et B dépend de A, il ne sait pas par lequel commencer. forwardRef permet de dire à Nest : "Ne t'inquiète pas, la classe existe, je te la donnerai plus tard quand elle sera chargée".
    private workspaceService: WorkspaceService,
    private userService: UserService,

    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  create(createProjectInput: CreateProjectInput) {
    const project = this.projectRepository.create({
      ...createProjectInput,
    });
    console.log('--- project ---', project);
    return this.projectRepository.save(project);
  }

  async createProject(
    dto: CreateProjectInput,
    userId: string,
    workspaceId: string,
  ) {
    // 1. Charger le workspace avec ses utilisateurs
    const workspace = await this.workspaceService.findOne(workspaceId);
    if (!workspace)
      throw new NotFoundException(`Workspace ${workspaceId} introuvable`);

    // 2. Charger l'utilisateur
    const user = await this.userService.findOne(userId);
    if (!user) throw new NotFoundException(`Utilisateur ${userId} introuvable`);

    // 3. Vérification de l'accès (plus robuste que [0])
    // On utilise Number() pour éviter le piège String vs Number
    const isMember = workspace.users?.some((u) => u.id === userId);
    if (!isMember) {
      throw new ForbiddenException(
        'Accès refusé - Vous ne faites pas partie de ce workspace',
      );
    }

    // 4. Création simplifiée
    const newProject = this.projectRepository.create({
      ...dto,
      workspace: workspace,
      users: [user],
    });

    console.log('Création du projet pour le workspace:', workspace.id);
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
