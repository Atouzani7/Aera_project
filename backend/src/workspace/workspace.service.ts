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

  async findOne(id: number): Promise<WorkspaceEntity> {
    const workspace = await this.workspaceRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!workspace) {
      throw new Error('Workspace not found');
    }

    console.log(workspace);
    return workspace;
  }

  update(id: number, updateWorkspaceInput: UpdateWorkspaceInput) {
    return `This action updates a #${id} workspace`;
  }

  remove(id: number) {
    return `This action removes a #${id} workspace`;
  }
}
