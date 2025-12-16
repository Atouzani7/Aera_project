import { Injectable } from '@nestjs/common';
import { CreateWorkspaceInput } from './dto/create-workspace.input';
import { UpdateWorkspaceInput } from './dto/update-workspace.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createWorkspaceInput: CreateWorkspaceInput) {
    const workspace = { ...createWorkspaceInput };
    return this.workspaceRepository.save(workspace);
  }

  findAll() {
    return `This action returns all workspace`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workspace`;
  }

  update(id: number, updateWorkspaceInput: UpdateWorkspaceInput) {
    return `This action updates a #${id} workspace`;
  }

  remove(id: number) {
    return `This action removes a #${id} workspace`;
  }
}
