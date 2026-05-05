import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { ProjectService } from 'src/project/project.service';
import { ClientEntity } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,

    @Inject(forwardRef(() => ProjectService))
    private projectService: ProjectService,
  ) {}

  async create(createClientInput: CreateClientInput): Promise<ClientEntity> {
    const newClient = this.clientRepository.create({
      ...createClientInput,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.clientRepository.save(newClient);
  }

  async findByPojectId(projectId: number) {
    const project = await this.projectService.findOne(projectId);

    return project;
  }

  async findOne(id: string) {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['projects'],
    });
    console.log('clientRepo back service', client);
    if (!client) throw new NotFoundException(`Client #${id} introuvable`);
    return client;
  }

  async findAll(): Promise<ClientEntity[]> {
    const clients = await this.clientRepository.find({
      where: {},
      relations: ['userId', 'projects'],
    });
    return this.clientRepository.find();
  }

  async findAllByUser(userId: string): Promise<ClientEntity[]> {
    const clients = await this.clientRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user', 'projects'],
    });
    console.log('clients back service client', clients);
    return clients;
  }

  update(id: number, updateClientInput: UpdateClientInput) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
