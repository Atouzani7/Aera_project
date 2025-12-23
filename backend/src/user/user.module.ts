import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { GqlAuthGuard } from 'src/auth/GlqAuthGuard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Workspace]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserResolver, UserService, WorkspaceService, GqlAuthGuard],
  exports: [UserService],
})
export class UserModule {}
