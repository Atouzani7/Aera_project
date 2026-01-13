import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from './dto/create-user.input';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<UserEntity> {
    // const existingUser = await this.userRepository.findOne({
    //   where: { email: createUserInput.email },
    // });
    const email = createUserInput.email.toLowerCase();
    createUserInput.email = email;

    const existingUser = await this.userRepository.findOne({
      where: { email },
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
    if (!user) {
      throw new Error('Vérifiez vos informations');
    }

    if (user.status === 'ARCHIVED') {
      throw new Error('Ce compte à été désactivé');
    }

    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
        id: user.id,
      },
      process.env.SECRET_KEY || 'ton_secret_par_defaut',
      {
        expiresIn: '2h',
        algorithm: 'HS256',
      },
    );

    workspace.users = [user];
    await this.workspaceRepository.save(workspace);

    return await this.userRepository.save(user);
  }

  async update(
    id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    // evite de vider un champs déja rempli par si je ne modifie pas ce champs
    for (const key in updateUserInput) {
      const value = updateUserInput[key];
      if (value !== undefined && value !== null) {
        user[key] = value;
      }
    }

    if (updateUserInput.password) {
      user.password = await argon2.hash(updateUserInput.password);
    }

    const updatedUser = { ...user, ...updateUserInput };
    // return await this.userRepository.save(updatedUser);
    return await this.userRepository.save(user);
  }

  findByEmail(email: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('LOWER(user.email) = LOWER(:email)', { email })
      .getOne();
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
