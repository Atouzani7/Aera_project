import { Test, TestingModule } from '@nestjs/testing';
import { StepResolver } from './step.resolver';
import { StepService } from './step.service';

describe('StepResolver', () => {
  let resolver: StepResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StepResolver, StepService],
    }).compile();

    resolver = module.get<StepResolver>(StepResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
