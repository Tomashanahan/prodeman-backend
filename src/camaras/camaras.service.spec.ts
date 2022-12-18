import { Test, TestingModule } from '@nestjs/testing';
import { CamarasService } from './camaras.service';

describe('CamarasService', () => {
  let service: CamarasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CamarasService],
    }).compile();

    service = module.get<CamarasService>(CamarasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
