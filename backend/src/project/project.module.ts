import { forwardRef, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { WorkspaceModule } from 'src/workspace/workspace.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { ClientEntity } from 'src/client/entities/client.entity';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, ClientEntity]),
    forwardRef(() => WorkspaceModule),
    UserModule,
    forwardRef(() => ClientModule),
  ],
  providers: [ProjectResolver, ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
