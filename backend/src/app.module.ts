/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
// import { AppResolver } from './app.resolver';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { CommentModule } from './comment/comment.module';
import { FileModule } from './file/file.module';
import { StepModule } from './step/step.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { UserEntity } from './user/entities/user.entity';
import { ProjectEntity } from './project/entities/project.entity';
import { Step } from './step/entities/step.entity';
import { Comment } from './comment/entities/comment.entity';
import { WorkspaceEntity } from './workspace/entities/workspace.entity';
import { File } from './file/entities/file.entity';
import { AuthModule } from './auth/auth.module';
import { Request, Response } from 'express';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [
        UserEntity,
        ProjectEntity,
        Step,
        Comment,
        File,
        WorkspaceEntity,
      ],
      synchronize: true,
      logging: true,
    }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
      // autoSchemaFile: true,
      sortSchema: true,
      playground: true,
      introspection: true,
      // autoSchemaFile: true,
      // typePaths: ['./**/*.graphql'],
    }),
    UserModule,
    ProjectModule,
    CommentModule,
    WorkspaceModule,
    FileModule,
    StepModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService /*AppResolver*/],
})
export class AppModule {}
