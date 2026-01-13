import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { WorkspaceModule } from 'src/workspace/workspace.module';
import { WorkspaceEntity } from 'src/workspace/entities/workspace.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, WorkspaceEntity]),
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10min' },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
