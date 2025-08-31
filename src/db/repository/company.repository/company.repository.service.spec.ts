import { Test, TestingModule } from '@nestjs/testing';
import { CompanyRepositoryService } from './company.repository.service';

describe('CompanyRepositoryService', () => {
  let service: CompanyRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyRepositoryService],
    }).compile();

    service = module.get<CompanyRepositoryService>(CompanyRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
