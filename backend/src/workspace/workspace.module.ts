import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceResolver } from './workspace.resolver';
import { WorkspaceEntity } from './entities/workspace.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceEntity]), UserModule],
  providers: [WorkspaceService, WorkspaceResolver],
})
export class WorkspaceModule {}
