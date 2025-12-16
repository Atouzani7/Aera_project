import { Module } from '@nestjs/common';
import { StepResolver } from './step.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step } from './entities/step.entity';
import { Project } from 'src/project/entities/project.entity';
import { StepService } from './step.service';

@Module({
  imports: [TypeOrmModule.forFeature([Step, Project])],
  providers: [StepResolver, StepService],
})
export class StepModule {}
