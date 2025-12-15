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

    const workspace = this.workspaceRepository.create({
      name: createUserDto.firstname, // ou un champ spécifique
    });

    await this.workspaceRepository.save(workspace);

    const user = this.userRepository.create({
      ...createUserDto,
      workspaces: workspace,
    });

    workspace.users = [user];

    return await this.userRepository.save(user);
  }

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Retrieve all user records
   * @returns {Promise<User[]>} - List of user records
   */
  /*******  964f9b68-f97e-4964-b14d-c5adf4a43447  *******/ findAll() {
    return `This action returns all user`;
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['workspaces'],
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
