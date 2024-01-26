import { Test, TestingModule } from '@nestjs/testing';
import { UnitySectionService } from './unity-section.service';

describe('UnitySectionService', () => {
  let service: UnitySectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitySectionService],
    }).compile();

    service = module.get<UnitySectionService>(UnitySectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
