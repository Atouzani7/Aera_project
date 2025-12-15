import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Workspace])],
  providers: [UserResolver, UserService, WorkspaceService],
})
export class UserModule {}
