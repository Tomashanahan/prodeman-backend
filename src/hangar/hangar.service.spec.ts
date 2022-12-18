import { Test, TestingModule } from '@nestjs/testing';
import { HangarService } from './hangar.service';

describe('HangarService', () => {
  let service: HangarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HangarService],
    }).compile();

    service = module.get<HangarService>(HangarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
