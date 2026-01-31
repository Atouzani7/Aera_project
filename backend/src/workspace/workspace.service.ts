import { Injectable } from '@nestjs/common';
import { CreateWorkspaceInput } from './dto/create-workspace.input';
import { UpdateWorkspaceInput } from './dto/update-workspace.input';
import { WorkspaceEntity } from './entities/workspace.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(WorkspaceEntity)
    private readonly workspaceRepository: Repository<WorkspaceEntity>,

    private readonly userService: UserService,
  ) {}

  async create(input: CreateWorkspaceInput) {
    const workspace = this.workspaceRepository.create({
      name: input.name,
      description: input.description,
      avatar: input.avatar,
      status: 'ACTIVE',
    });

    return this.workspaceRepository.save(workspace);
  }

  findAll() {
    return `This action returns all workspace`;
  }

  async findOne(id: string): Promise<WorkspaceEntity> {
    const workspace = await this.workspaceRepository.findOne({
      where: { id },
      relations: ['users', 'projects'],
    });

    if (!workspace) {
      throw new Error('Workspace not found');
    }

    console.log(workspace);
    return workspace;
  }

  async findUserWorkspaces(userId: string): Promise<WorkspaceEntity[]> {
    const workspaces = await this.workspaceRepository.find({
      relations: ['users', 'projects'],
      where: {
        users: {
          id: userId,
        },
      },
    });

    return workspaces;
  }

  async addUserToWorkspace(
    workspaceId: string,
    userId: string,
  ): Promise<WorkspaceEntity> {
    const workspace = await this.findOne(workspaceId);
    const user = await this.userService.findOne(userId);

    workspace.users.push(user?.id as unknown as UserEntity);
    return this.workspaceRepository.save(workspace);
  }

  update(id: string, updateWorkspaceInput: UpdateWorkspaceInput) {
    return `This action updates a #${id} workspace`;
  }

  remove(id: number) {
    return `This action removes a #${id} workspace`;
  }
}
