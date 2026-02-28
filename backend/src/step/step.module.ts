import { Module } from '@nestjs/common';
import { StepService } from './step.service';
import { StepResolver } from './step.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepEntity } from './entities/step.entity';
import { ProjectEntity } from 'src/project/entities/project.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StepEntity, UserEntity, ProjectEntity])],
  providers: [StepResolver, StepService],
  exports: [StepService],
})
export class StepModule {}
