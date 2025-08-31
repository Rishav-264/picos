import { Test, TestingModule } from '@nestjs/testing';
import { BillingInfoRepositoryService } from './billing_info.repository.service';

describe('BillingInfoRepositoryService', () => {
  let service: BillingInfoRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillingInfoRepositoryService],
    }).compile();

    service = module.get<BillingInfoRepositoryService>(BillingInfoRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
