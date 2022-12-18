import { Test, TestingModule } from '@nestjs/testing';
import { TallerService } from './taller.service';

describe('TallerService', () => {
  let service: TallerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TallerService],
    }).compile();

    service = module.get<TallerService>(TallerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
