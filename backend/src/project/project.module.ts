import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { Project } from './entities/project.entity';
import { Step } from 'src/step/entities/step.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Step, Project])],
  providers: [ProjectResolver, ProjectService],
})
export class ProjectModule {}
