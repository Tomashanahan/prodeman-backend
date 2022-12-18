import { Test, TestingModule } from '@nestjs/testing';
import { HangarOficinaService } from './hangar-oficina.service';

describe('HangarOficinaService', () => {
  let service: HangarOficinaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HangarOficinaService],
    }).compile();

    service = module.get<HangarOficinaService>(HangarOficinaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
