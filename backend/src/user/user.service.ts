import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from 'src/workspace/entities/workspace.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}
  async create(createUserDto: CreateUserInput): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new Error(`User with email ${createUserDto.email} already exists`);
    }
    const defaultWorkspaceName = `${createUserDto.firstname}'s Workspace`;
    const workspaceName = createUserDto.workspaceName || defaultWorkspaceName;

    const workspace = this.workspaceRepository.create({
      // name: createUserDto.firstname,
      name: workspaceName,
    });

    await this.workspaceRepository.save(workspace);

    const user = this.userRepository.create({
      ...createUserDto,
      workspaces: workspace,
    });

    workspace.users = [user];
    await this.workspaceRepository.save(workspace);

    return await this.userRepository.save(user);
  }

  // /*************  ✨ Windsurf Command ⭐  *************/
  // /**
  //  * Retrieve all user records
  //  * @returns {Promise<User[]>} - List of user records
  //  */
  // /*******  964f9b68-f97e-4964-b14d-c5adf4a43447  *******/ findAll() {
  //   return `This action returns all user`;
  // }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['workspaces'],
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  findAllWithWorkspace(workspaceId: number): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.workspaces', 'workspace')
      .where('workspace.id = :workspaceId', { workspaceId })
      .getMany();
  }

  findUserByRole(role: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.role = :role', { role })
      .getMany();
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    const updatedUser = { ...user, ...updateUserInput };
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    await this.userRepository.update(id, {
      status: 'DELETED',
      DeleteDateColumn: new Date(),
    });
    return {
      ...user,
      status: 'DELETED',
      DeleteDateColumn: new Date(),
    };
  }

  async archive(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    await this.userRepository.update(id, {
      status: 'ARCHIVED',
      archiveDateColumn: new Date(),
    });
    return this.userRepository.findOne({ where: { id } });
  }

  async unarchive(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    await this.userRepository.update(id, {
      status: 'ACTIVE',
      unarchiveDateColumn: new Date(),
    });
    return this.userRepository.findOne({ where: { id } });
  }
}
