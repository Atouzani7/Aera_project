import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}
  async create(createUserInput: CreateUserInput): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserInput.email },
    });
    if (existingUser) {
      throw new Error(`User with email ${existingUser.email} already exists`);
    }
    const defaultWorkspace = `${createUserInput.firstname}'s Workspace`;
    const workspaceName = createUserInput.workspaceName || defaultWorkspace;
    const workspace = await this.workspaceRepository.save({
      name: workspaceName,
    });
    const user = await this.userRepository.save({
      ...createUserInput,
      workspaces: workspace,
    });

    workspace.users = [user];
    await this.workspaceRepository.save(workspace);

    return await this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['workspaces'],
    });
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
