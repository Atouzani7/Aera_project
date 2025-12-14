import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import { AppResolver } from './app.resolver';
import { UserModule } from './user/user.module';
import { StepModule } from './step/step.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { CommentModule } from './comment/comment.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { CommentModule } from './comment/comment.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.USERNAME_database ?? 'asma',
      password: process.env.PASSWORD_database ?? 'aera_project_password',
      database: 'aera_project_db',
      entities: [],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // autoSchemaFile: true,
      sortSchema: true,
      playground: true,
      introspection: true,
      // typePaths: ['./**/*.graphql'],
    }),
    UserModule,
    ProjectModule,
    CommentModule,
    WorkspaceModule,
    FileModule,
    StepModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
