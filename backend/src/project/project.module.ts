import { forwardRef, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { WorkspaceModule } from 'src/workspace/workspace.module';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { ClientEntity } from 'src/client/entities/client.entity';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([ProjectEntity, ClientEntity]),
//     forwardRef(() => WorkspaceModule), // Utilise forwardRef ici
//     UserModule,
//   ],
//   providers: [ProjectResolver, ProjectService],
//   exports: [ProjectService],
// })
// export class ProjectModule {}

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, ClientEntity]),
    forwardRef(() => WorkspaceModule),
    UserModule,
  ],
  providers: [ProjectResolver, ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
