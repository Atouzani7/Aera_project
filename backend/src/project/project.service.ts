import {
  BadRequestException,
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
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkspaceEntity } from 'src/workspace/entities/workspace.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ProjectStatus, ProjectTagEnum } from './entities/enums/project.enums';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(forwardRef(() => WorkspaceService))
    // Quand A dépend de B et B dépend de A, il ne sait pas par lequel commencer. forwardRef permet de dire à Nest : "Ne t'inquiète pas, la classe existe, je te la donnerai plus tard quand elle sera chargée".
    private workspaceService: WorkspaceService,
    private userService: UserService,
    private clientService: ClientService,

    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  create(createProjectInput: CreateProjectInput) {
    const project = this.projectRepository.create({
      ...createProjectInput,
      status: (createProjectInput.status ??
        ProjectStatus.PLANNED) as ProjectStatus,
    });

    console.log('--- project ---', project);
    return this.projectRepository.save(project);
  }

  // async createProject(
  //   dto: CreateProjectInput,
  //   userId: string,
  //   workspaceId: string,
  // ) {
  //   // 1. Charger le workspace avec ses utilisateurs
  //   const workspace = await this.workspaceService.findOne(workspaceId);
  //   if (!workspace)
  //     throw new NotFoundException(`Workspace ${workspaceId} introuvable`);

  //   // 2. Charger l'utilisateur
  //   const user = await this.userService.findOne(userId);
  //   if (!user) throw new NotFoundException(`Utilisateur ${userId} introuvable`);

  //   // 3. Vérification de l'accès
  //   const isMember = workspace.users?.some((u) => u.id === userId);
  //   if (!isMember) {
  //     throw new ForbiddenException(
  //       'Accès refusé - Vous ne faites pas partie de ce workspace',
  //     );
  //   }
  //   let client;
  //   // 1. Créer le client d'abord
  //   // On part du principe que CreateProjectInput contient les infos du client
  //   if (dto.clientId) {
  //     // Cas 1 : On utilise un client existant
  //     const client = await this.clientService.findOne(dto.clientId);
  //   } else {
  //     // Cas 2 : On crée un nouveau client
  //     // C'est ici que tu dois faire attention aux noms des champs !
  //     const client = await this.clientService.create({
  //       name: dto.contact_name,
  //       lastname: dto.contact_lastname,
  //       email: dto.contact_email, // Assure-toi que cet email n'est pas undefined
  //       phone: dto.contact_phone,
  //       address: dto.contact_address,
  //       city: dto.contact_city,
  //       country: dto.contact_country,
  //       postalCode: dto.contact_postalCode,
  //     });
  //   }
  //   if (!dto.clientId && !dto.contact_email) {
  //     throw new BadRequestException(
  //       "Vous devez soit fournir un 'clientId', soit un 'clientEmail' pour créer un nouveau client.",
  //     );
  //   }

  //   // 4. Préparer l'objet avec cast DeepPartial pour TypeORM
  //   const projectData: DeepPartial<ProjectEntity> = {
  //     ...dto,
  //     status: (dto.status ?? ProjectStatus.PLANNED) as ProjectStatus,
  //     tag: dto.tag as ProjectTagEnum,
  //     workspace: workspace as DeepPartial<WorkspaceEntity>,
  //     users: [user] as DeepPartial<UserEntity>[],
  //     client: client as DeepPartial<ClientEntity>,
  //   };

  //   // 5. Créer et sauvegarder
  //   const newProject = this.projectRepository.create(projectData);

  //   return await this.projectRepository.save(newProject);
  // }

  async createProject(
    dto: CreateProjectInput,
    userId: string,
    workspaceId: string,
  ) {
    // 1. Charger workspace + user
    const [workspace, user] = await Promise.all([
      this.workspaceService.findOne(workspaceId),
      this.userService.findOne(userId),
    ]);

    if (!workspace)
      throw new NotFoundException(`Workspace ${workspaceId} introuvable`);

    if (!user) throw new NotFoundException(`Utilisateur ${userId} introuvable`);

    // 2. Vérification accès workspace
    const isMember = workspace.users?.some((u) => u.id === userId);
    if (!isMember) {
      throw new ForbiddenException(
        'Accès refusé - Vous ne faites pas partie de ce workspace',
      );
    }

    // 3. Gestion client (récupération ou création)
    let clientEntity;

    if (dto.clientId) {
      clientEntity = await this.clientService.findOne(String(dto.clientId));

      if (!clientEntity) {
        throw new NotFoundException(`Client ${dto.clientId} introuvable`);
      }
    } else if (dto.contact_email) {
      clientEntity = await this.clientService.create({
        name: dto.contact_name,
        lastname: dto.contact_lastname,
        email: dto.contact_email,
        phone: dto.contact_phone,
        address: dto.contact_address,
        city: dto.contact_city,
        country: dto.contact_country,
        postalCode: dto.contact_postalCode,
      });
    } else {
      throw new BadRequestException(
        'Vous devez fournir soit un clientId, soit un contact_email',
      );
    }

    // 4. Nettoyage DTO (IMPORTANT)
    const {
      clientId,
      contact_name,
      contact_lastname,
      contact_email,
      contact_phone,
      contact_address,
      contact_city,
      contact_country,
      contact_postalCode,
      ...projectFields
    } = dto;

    // 5. Création projet (SANS champs contact -> plus d'erreur NOT NULL)
    // const projectData: DeepPartial<ProjectEntity> = {
    //   ...projectFields,

    //   status: dto.status ?? ProjectStatus.PLANNED,
    //   tag: dto.tag as ProjectTagEnum,

    //   workspace: { id: workspaceId } as any,
    //   users: [{ id: userId }] as any,

    //   client: clientEntity,
    // };

    const projectData: DeepPartial<ProjectEntity> = {
      ...projectFields,
      client: clientEntity,
      workspace: { id: workspaceId } as any,
      users: [{ id: userId }] as any,
      status: dto.status ?? ProjectStatus.PLANNED,
    };
    // 6. Save
    const newProject = this.projectRepository.create(projectData);
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
